/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Module } from '@nestjs/common';

import { HttpBingoModule } from 'src/httpbingo.module';

import { HelloWorldModuleController } from './hello.world.module.controller';
import { HelloWorldModuleService } from './hello.world.module.service';

@Module({
    imports: [ HttpBingoModule ],
    controllers: [ HelloWorldModuleController ],
    providers: [ HelloWorldModuleService ],
})
export class HelloWorldModule {}
