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

/**
 * README:
 * 1. Module loaded in the Global Context.
 * 2. Module loads the ENV in the NEST context.
 * 3. Performs the Datatype Conversion and expose it as an Object (refer: config.shared.schema.ts).
 * 4. Added in shared.modules.module in Global Context.
 * 
 * FYI:
 * 1. Please add the ENV in A_B_C format.
 * 2. Being exposed under A.B_C or A.B.C (based on preference) key in config.shared.schema.ts
 */

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
