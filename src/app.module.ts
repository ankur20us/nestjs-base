/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { HelloWorldModule } from 'src/hello.world.module/';
import { HttpBingoModule } from 'src/httpbingo.module';
import { CorrelationMiddleware } from 'src/shared/middlewares';
import { SharedModulesModule } from 'src/shared/modules/';

@Module({
    imports: [ HelloWorldModule, SharedModulesModule, HttpBingoModule ],
})
export class AppModule implements NestModule {
    
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(
            CorrelationMiddleware
        ).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
