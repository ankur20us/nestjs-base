/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

import { CONSTANTS } from 'src/shared/modules/';

/**
 * Interceptor is responsible to add the ENTER/EXIT of any call in the system,
 * along with the total time spent to return the response.
 * 1. If the setup is PROD in nature: METHOD, URL -> will be logged
 * 2. Else: METHOD, URL, BODY -> will be logged.
 */
@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
    private readonly className = HttpLoggingInterceptor.name;
    private readonly logger = new Logger(this.className);
    
    constructor(private readonly configService: ConfigService) {}

    intercept( context: ExecutionContext, next: CallHandler<any> ): Observable<any> | Promise<Observable<any>> {
        
        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();

        const correlationId = request.get(CONSTANTS.ENV.HEADERS.CORRELATION_ID.NAME);

        const objectToPrintEntry = JSON.stringify({
            context: CONSTANTS.SESSION_CONTEXT.ENTER,
            correlationId,
            request: this._getMetaDataFromRequest(request),
        });

        this.logger.log(`${objectToPrintEntry}`);
        const start = Date.now();

        return next.handle().pipe(
            tap(() => {
                const objectToPrint = JSON.stringify({
                    context: CONSTANTS.SESSION_CONTEXT.EXIT,
                    correlationId,
                    lag: Date.now() - start,
                    response: this._getMetaDataFromResponse(response),
                });

                this.logger.log(objectToPrint);
            })
        );
    }

    private _getMetaDataFromRequest(request: Request): {
        method: string;
        url: string;
        body?: Record<string, any>;
    } {
        const { method, url, body } = request;

        return this.configService.get<boolean>('SYSTEM.IS_PROD') ? { method, url } : { method, url, body };
    }

    private _getMetaDataFromResponse(response: Response): { status: number } {
        return {
            status: response.statusCode,
        };
    }
}
