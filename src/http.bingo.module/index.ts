/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { HttpModule, HttpModuleOptions, HttpService } from '@nestjs/axios';
import { Injectable, Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { Commons } from 'src/shared/commons';

@Injectable()
export class HttpBingoService {

    private readonly className = HttpBingoService.name;
    private readonly logger = new Logger(this.className);

    constructor( private readonly httpService: HttpService) {}

    /**
     * 1. We can add type as well, and return the same for better visibility
     * 2. No need to tell the base url since it is being added in below module as baseURL
     */
    public async get() {
        const { data } = await firstValueFrom(this.httpService.get('get'));
        
        return data;
    }

}

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: (_configService: ConfigService):  Promise<HttpModuleOptions> | HttpModuleOptions => {
                /**
                 * 1. We can read from env as well, if needed using the configService object
                 * 2. No need to import ConfigModule since we have added the ConfigModule
                 *    in the Global namespace using the @Global decorator
                 * 3. Added _ in front to tell eslint not to complain about unused variable
                 */
                const options: HttpModuleOptions = {
                    baseURL: 'https://httpbingo.org/',  
                };
                
                return options;
            },
        }),
    ],
    providers: [ HttpBingoService ],
    exports: [ HttpBingoService ],
})
export class HttpBingoModule implements OnModuleInit, OnModuleDestroy {

    private readonly className = HttpBingoModule.name;
    private readonly logger = new Logger(this.className);

    onModuleInit(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleInit(this.className));
    }

    onModuleDestroy(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleDestroy(this.className));
    }

}
