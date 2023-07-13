/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { Commons } from 'src/shared/commons';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [],
            inject: [ ConfigService ],
            useFactory: (configService: ConfigService): Promise<JwtModuleOptions> | JwtModuleOptions => {

                const options: JwtModuleOptions = {
                    secret: configService.get<string>('JWT.SECRET'),
                    signOptions: {
                        algorithm: 'HS256',
                        expiresIn: configService.get<number>('JWT.EXPIRES_IN'),
                    },
                };
                
                return options;
            },
        }),
    ],
    exports: [ JwtModule ],
})
export class JwtSharedFactoryModule implements OnModuleInit, OnModuleDestroy {

    private readonly className = JwtSharedFactoryModule.name;
    private readonly logger = new Logger(this.className);

    onModuleInit(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleInit(this.className));
    }

    onModuleDestroy(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleDestroy(this.className));
    }

}
