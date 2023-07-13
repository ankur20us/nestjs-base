/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Controller, Get } from '@nestjs/common';

import { HelloWorldModuleService } from './hello.world.module.service';

@Controller()
export class HelloWorldModuleController {
    constructor(
        private readonly helloWorldModuleService: HelloWorldModuleService
    ) {}

    @Get()
    async getHello(): Promise<string> {
        return this.helloWorldModuleService.getMessage();
    }
}
