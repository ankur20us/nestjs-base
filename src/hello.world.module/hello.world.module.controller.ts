/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtVerifyGuard } from 'src/shared/guards';

import { HelloWorldModuleService } from './hello.world.module.service';

@Controller()
export class HelloWorldModuleController {
    constructor(
        private readonly helloWorldModuleService: HelloWorldModuleService
    ) {}

    @UseGuards(JwtVerifyGuard)
    @Get()
    async getHello(): Promise<string> {
        return this.helloWorldModuleService.getMessage();
    }
}
