/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { Commons } from 'src/shared/commons';
import { CONSTANTS } from 'src/shared/modules';

/**
 * README:
 * 1. Module loads the RedisService.
 * 2. Please add the appropriate ENV's while initiating the Service.
 * 3. ENV's used, check in forRootAsync() for ref.
 */
const CONNECTION_NAME = 'REDIS_CONNECTION_NAME';

@Module({
    imports: [
        RedisModule.forRootAsync({
            inject: [ ConfigModule ],
            useFactory: (configService: ConfigService): Promise<RedisModuleOptions> | RedisModuleOptions => {

                const MODULE_NAME = RedisConfigModule.name;
                const logger = new Logger(MODULE_NAME);

                const REDIS_HOST = configService.get<string>('REDIS.HOST');
                const REDIS_PORT = configService.get<number>('REDIS.PORT');
                const REDIS_PASSWORD = configService.get<string>('REDIS.PASSWORD');
                const REDIS_READY_LOG = configService.get<boolean>('REDIS.READY_LOG');
                const REDIS_ERROR_LOG = configService.get<boolean>('REDIS.ERROR_LOG');

                const finalConfig: RedisModuleOptions = {
                    readyLog: REDIS_READY_LOG,
                    closeClient: true,
                    errorLog: REDIS_ERROR_LOG,
                    config: {
                        namespace: CONNECTION_NAME,
                        host: REDIS_HOST,
                        port: REDIS_PORT,
                        password: REDIS_PASSWORD,

                        onClientCreated: (client: Redis) => {
                            // client.on('error', err => { });
                            client.on(CONSTANTS.MODULE_LIFECYCLE.READY, () => {
                                logger.log(Commons.MessageGenerator.ModuleLifeCycle.onReady(MODULE_NAME, CONNECTION_NAME));
                            });
                        },
                    },
                };

                return finalConfig;
            },
        }),

    ],
})
export class RedisConfigModule implements OnModuleInit, OnModuleDestroy {
    private readonly className = RedisConfigModule.name;
    private readonly logger = new Logger(this.className);

    onModuleInit(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleInit(this.className));
    }

    onModuleDestroy(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleDestroy(this.className));
    }
}
