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

/**
 * README:
 * 1. Module loads the JwtService in the Global Context.
 * 2. Please add the appropriate ENV's while initiating the Service.
 * 3. In this Code 3 ENV's are used, check the forRootAsync() for ref.
 * 4. Added in shared.modules.module in Global Context.
 */

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
        const [ _errorVerifyAsync, resultVerifyAsync ] = await Commons.tc(this.jwtService.verifyAsync(token, { secret: this.JWT_SECRET }));

        return resultVerifyAsync;
    }

    public async generateToken(input: { request: any }): Promise<string> {
        const { request } = input;
        const [ _errorSignAsync, resultSignAsync ] = await Commons.tc(this.jwtService.signAsync(request, { secret: this.JWT_SECRET }));

        return resultSignAsync;
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
