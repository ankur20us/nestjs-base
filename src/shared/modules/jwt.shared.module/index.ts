/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Injectable, Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';

import { Commons } from 'src/shared/commons';
import { GenericApplicationErrorDto } from 'src/shared/dtos';
import { CONSTANTS } from 'src/shared/modules';

@Injectable()
export class JwtSharedService {

    private readonly className = JwtSharedService.name;
    private readonly logger = new Logger(this.className);

    private JWT_SECRET: string;

    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) { 
        this.JWT_SECRET = this.configService.get<string>('JWT.SECRET');
    }

    public async verifyToken(input: { request: { token: string }}) {
        const { request: { token }} = input;
        const [ errorVerifyAsync, resultVerifySync ] = await Commons.tc(this.jwtService.verifyAsync(token, { secret: this.JWT_SECRET }));

        if(errorVerifyAsync)
            throw new GenericApplicationErrorDto({
                status: CONSTANTS.RESPONSE.BAD_REQUEST.STATUS,
                code: CONSTANTS.RESPONSE.BAD_REQUEST.CODE,
                message: 'Authorization header expired/tampored',
            });

        return resultVerifySync;
    }

}

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [],
            inject: [ ConfigService ],
            useFactory: (configService: ConfigService): Promise<JwtModuleOptions> | JwtModuleOptions => {

                const JWT_SECRET = configService.get<string>('JWT.SECRET');
                const JWT_EXPIRES_IN = configService.get<number>('JWT.EXPIRES_IN');
                const JWT_ALGORITHM = configService.get<Algorithm>('JWT.ALGORITHM');

                const options: JwtModuleOptions = {
                    secret: JWT_SECRET,
                    signOptions: {
                        algorithm: JWT_ALGORITHM,
                        expiresIn: JWT_EXPIRES_IN,
                    },
                };
                
                return options;
            },
        }),
    ],
    providers: [ JwtSharedService ],
    exports: [ JwtSharedService ],
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
