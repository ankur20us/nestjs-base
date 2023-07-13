/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Commons } from 'src/shared/commons';

import { ConfigSharedSchema } from './config.shared.schema';
import { ConfigSharedValidation } from './config.shared.validation';

@Module({
    exports: [ ConfigModule ],
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: false,
            load: [ ConfigSharedSchema ],
            validationOptions: {
                abortEarly: false,
                allowUnknown: true,
            },
            validationSchema: ConfigSharedValidation,
        }),
    ],
})
export class ConfigSharedModule implements OnModuleInit, OnModuleDestroy {
    private readonly className = ConfigSharedModule.name;
    private readonly logger = new Logger(this.className);

    onModuleInit(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleInit(this.className));
    }

    onModuleDestroy(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleDestroy(this.className));
    }
}
