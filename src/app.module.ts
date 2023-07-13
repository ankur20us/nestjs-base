/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Module } from '@nestjs/common';

import { HelloWorldModule } from 'src/hello.world.module/';
import { HttpBingoModule } from 'src/httpbingo.module';
import { SharedModulesModule } from 'src/shared/modules/';

@Module({
    imports: [ HelloWorldModule, SharedModulesModule, HttpBingoModule ],
})
export class AppModule {}
