/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, ForbiddenException, HttpException, Logger, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import * as PrettyError from 'pretty-error';

import { Commons } from 'src/shared/commons';
import { GenericApplicationErrorDto } from 'src/shared/dtos';
import { CONSTANTS } from 'src/shared/modules';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);
    private readonly pe: PrettyError = new PrettyError().skipNodeFiles();

    catch(exception: any, host: ArgumentsHost) {
        const response: Response = host.switchToHttp().getResponse();

        let status = 500;
        let code = 'EXCEPTION';
        let message = 'Kuch to gadbad hai daya';
        let errors: Array<any> = [];

        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();

            const exceptionMap = {
                [UnauthorizedException.name]: CONSTANTS.RESPONSE.UNAUTHORIZED,
                [BadRequestException.name]: CONSTANTS.RESPONSE.BAD_REQUEST,
                [ForbiddenException.name]: CONSTANTS.RESPONSE.FORBIDDEN_RESOURCE,
            };

            if (exceptionMap[exception.name]) {
                status = Commons.setDefaultValue<number>(exceptionResponse['status'], exceptionMap[exception.name].STATUS);
                code = Commons.setDefaultValue<string>(exceptionResponse['code'], exceptionMap[exception.name].CODE);
                message = Commons.setDefaultValue<string>(exceptionResponse['message'], exceptionMap[exception.name].MESSAGE);
                errors = Commons.setDefaultValue<Array<any>>(exceptionResponse['errors'], []);
            } else if (exception instanceof HttpException) {
                status = Commons.setDefaultValue<number>(exceptionResponse['status'], CONSTANTS.RESPONSE.FAILURE.STATUS);
                code = this._processCodeFromParsedError(exception);
                message = this._processMessageFromParsedError(exception);
            } else {
                status = Commons.setDefaultValue(exceptionResponse['status'], CONSTANTS.RESPONSE.FAILURE.STATUS);
                code = Commons.setDefaultValue(exceptionResponse['code'], CONSTANTS.RESPONSE.FAILURE.CODE);
                message = Commons.setDefaultValue(exceptionResponse['message'], CONSTANTS.RESPONSE.BAD_REQUEST.MESSAGE);
                errors = Commons.setDefaultValue(exceptionResponse['errors'], []);
            }
        } else if(exception instanceof GenericApplicationErrorDto) {
            status = Commons.setDefaultValue<number>(exception.status, CONSTANTS.RESPONSE.FAILURE.STATUS);
            code = Commons.setDefaultValue<string>(exception.code, CONSTANTS.RESPONSE.FAILURE.CODE);
            message = Commons.setDefaultValue<string>(exception.message, CONSTANTS.RESPONSE.FAILURE.MESSAGE);
            errors = Commons.setDefaultValue<Array<any>>(exception.errors, []);
        } else {
            status = Commons.setDefaultValue<number>(exception.status, CONSTANTS.RESPONSE.FAILURE.STATUS);
            code = Commons.setDefaultValue<string>(exception.code, CONSTANTS.RESPONSE.FAILURE.CODE);
            message = Commons.setDefaultValue<string>(exception.message, CONSTANTS.RESPONSE.BAD_REQUEST.MESSAGE);
            errors = Commons.setDefaultValue<Array<any>>(exception.errors, []);
        }

        /**
         * Logs all errors
         */
        const applicationError = new GenericApplicationErrorDto({ status, code, message, errors });

        this.logger.log(`\n ${this.pe.render(exception)}`);
        this.logger.error(`${applicationError}`);

        /**
         * Generic object to be sent
         */
        response.status(status).json(applicationError);
    }

    private _processCodeFromParsedError(parsedError): string {
        return parsedError?.code || parsedError?.error || CONSTANTS.RESPONSE.FAILURE.CODE;
    }

    private _processMessageFromParsedError(parsedError): string {
        return (
            parsedError?.message ||
            parsedError?.msg ||
            parsedError?.error?.message ||
            parsedError?.error?.msg ||
            parsedError?.data?.message ||
            'Unknown Exception'
        );
    }

}
