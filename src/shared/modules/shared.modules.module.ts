/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Global, Module } from '@nestjs/common';

import { ConfigSharedModule } from './config.shared.module';
import { JwtSharedFactoryModule } from './jwt.shared.module';

const CIEP = [ ConfigSharedModule, JwtSharedFactoryModule ];

@Global()
@Module({
    imports: CIEP,
    exports: CIEP,
})
export class SharedModulesModule {}
