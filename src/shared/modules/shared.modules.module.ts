/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Global, Module } from '@nestjs/common';

import { ConfigSharedModule } from './config.shared.module';
import { JwtSharedFactoryModule } from './jwt.shared.module';

/**
 * README:
 * 1. Add the Module in this array if needed to be loaded in Global Context.
 * 2. The exported class will be available in Global Namespace
 */

const CIEP = [ ConfigSharedModule, JwtSharedFactoryModule ];

@Global()
@Module({
    imports: CIEP,
    exports: CIEP,
})
export class SharedModulesModule {}
