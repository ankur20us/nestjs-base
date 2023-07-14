/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

import { Commons } from '../commons';
import { GenericApplicationErrorDto } from '../dtos';
import { CONSTANTS } from '../modules';
import { JwtSharedService } from '../modules/jwt.shared.module';

@Injectable()
export class JwtVerifyGuard implements CanActivate {
    private readonly className = JwtVerifyGuard.name;
    private readonly logger = new Logger(this.className);

    constructor(private readonly jwtSharedService: JwtSharedService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest<Request>();

        const authorizationHeader = request?.headers?.authorization;

        if (Commons.isEmpty(authorizationHeader)) {
            throw new GenericApplicationErrorDto({
                status: CONSTANTS.RESPONSE.BAD_REQUEST.STATUS,
                code: CONSTANTS.RESPONSE.BAD_REQUEST.CODE,
                message: 'Authorization header missing',
            });
        } else if (!Commons.startsWithIgnoreCase(authorizationHeader, `${CONSTANTS.STRING.BEARER} `)) {
            throw new GenericApplicationErrorDto({
                status: CONSTANTS.RESPONSE.BAD_REQUEST.STATUS,
                code: CONSTANTS.RESPONSE.BAD_REQUEST.CODE,
                message: 'Token Type missing (bearer/basic)',
            });
        }

        const [ , token ] = Commons.split(authorizationHeader, ' ');
        const [ errorVerifyToken, responseVerifyToken ] = await Commons.tc(this.jwtSharedService.verifyToken({ request: { token }}));
        
        if(errorVerifyToken) throw errorVerifyToken;

        request['META'] = { user: responseVerifyToken };

        return true;
    }
}
