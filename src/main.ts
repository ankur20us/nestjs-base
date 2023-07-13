/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { BadRequestException, HttpStatus, INestApplication, Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { Commons } from 'src/shared/commons';
import { HttpExceptionFilter } from 'src/shared/filters';
import { HttpLoggingInterceptor } from 'src/shared/interceptors';
import { ConfigSharedSchema, CONSTANTS } from 'src/shared/modules/';

import { AppModule } from './app.module';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule, {
        logger: _getLogLevels(),
    });

    _printEnvVariables(app);
    await _configureServer(app);

};

const _printEnvVariables = (app: INestApplication) => {
    const { logger, isIAmProd } = _getHelpersFromINestApp(app);

    if (!isIAmProd) logger.debug(`Final Loaded Config: ${JSON.stringify(ConfigSharedSchema(), null, 2)}`);
};

const _getLogLevels = (): LogLevel[] => {
    const isIAmProd = process.env.SYSTEM_NODE_ENV === CONSTANTS.ENV.PRODUCTION;

    if (isIAmProd) {
        return [ 'log', 'warn', 'error' ];
    }

    return [ 'error', 'warn', 'log', 'verbose', 'debug' ];
};

const _getHelpersFromINestApp = (app: INestApplication): { configService: ConfigService; logger: Logger; isIAmProd: boolean; } => {
    const configService = app.get(ConfigService);

    const isIAmProd = configService.get<boolean>('SYSTEM.IS_PROD');

    const logger = new Logger('Main.ts');

    return {
        configService,
        isIAmProd,
        logger,
    };
};

const _configureServer = async (app: INestApplication) => {
    const { logger, configService } = _getHelpersFromINestApp(app);

    const port = configService.get<number>('SYSTEM.PORT');

    app
        .useGlobalInterceptors(new HttpLoggingInterceptor(configService))
        .useGlobalFilters(new HttpExceptionFilter())
        .useGlobalPipes(
            new ValidationPipe({
                forbidUnknownValues: true,
                transform: true,
                exceptionFactory(validationErrors: ValidationError[] = []) {
                    return new BadRequestException({
                        status: HttpStatus.BAD_REQUEST,
                        code: CONSTANTS.RESPONSE.BAD_REQUEST.CODE,
                        message: CONSTANTS.RESPONSE.BAD_REQUEST.MESSAGE,
                        errors: validationErrors.map((ve) => Commons.omit(ve, [ 'target', 'children' ])),
                    });
                },
            })
        )
        .enableShutdownHooks()
        .use(helmet())
        .use(cookieParser())
        .enableCors();

    await app.listen(port);

    logger.log(`Server started at ${port}`);
};

bootstrap();
