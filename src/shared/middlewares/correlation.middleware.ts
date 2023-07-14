/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { Commons } from 'src/shared/commons/';
import { CONSTANTS } from 'src/shared/modules/';

@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
    
    private readonly className = CorrelationMiddleware.name;
    private readonly logger = new Logger(this.className);

    use(request: Request, response: Response, next: (error?: any) => void) {
        const correlationId = this._getOrGenerateCorrelationIdIfNotPresentInRequest(request);

        this.logger.log(`Correlation Id set for request ${correlationId}`);
        request.headers[CONSTANTS.ENV.HEADERS.CORRELATION_ID.NAME] = correlationId;
        response.setHeader(CONSTANTS.ENV.HEADERS.CORRELATION_ID.NAME, correlationId);

        next();
    }

    /**
     * Function to generate or return the correlation id
     * @param {request} Request object of the incoming call
     * @returns {string} correlation id
     */
    private _getOrGenerateCorrelationIdIfNotPresentInRequest(request: Request): string {
        return Commons.isEmpty(request.get(CONSTANTS.ENV.HEADERS.CORRELATION_ID.NAME))
            ? Commons.generateUuidV4()
            : request.get(CONSTANTS.ENV.HEADERS.CORRELATION_ID.NAME);
    }
}
