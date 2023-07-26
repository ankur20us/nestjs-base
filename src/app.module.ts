/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { HelloWorldModule } from 'src/hello.world.module/';
import { CorrelationMiddleware } from 'src/shared/middlewares';
import { SharedModulesModule } from 'src/shared/modules/';

/**
 * 1. IMPORT List to Load the Modules 
 * 2. Add MongooseModule  
 */
const IMPORTS = [ HelloWorldModule, SharedModulesModule ];

@Module({
    imports: IMPORTS,
})
export class AppModule implements NestModule {
    
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(
            CorrelationMiddleware
        ).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
