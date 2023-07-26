/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Injectable, Logger } from '@nestjs/common';

import { HttpBingoService } from 'src/http.bingo.module';

@Injectable()
export class HelloWorldModuleService {
    private readonly className = HelloWorldModuleService.name;
    private readonly logger = new Logger(this.className);

    constructor(private readonly httpBingoService: HttpBingoService) { }

    public async getMessage(): Promise<string> {
        const test = await this.httpBingoService.get();
        this.logger.log(JSON.stringify(test));

        return 'Hello World';
    }
}
