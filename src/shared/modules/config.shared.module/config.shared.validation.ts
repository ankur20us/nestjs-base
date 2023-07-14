/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

/* eslint-disable import/namespace */
import * as Joi from 'joi';

export const ConfigSharedValidation = Joi.object({
    
    // SYSTEM VALIDATION
    SYSTEM_SERVICE_NAME: Joi.string().default('base-nestjs-rest-service'),
    SYSTEM_PORT: Joi.number().integer().min(2999).max(65535).default(5002),
    NODE_ENV: Joi.string().valid('dev', 'production', 'test', 'provision', 'qa').default('dev'),
   
    // JWT SECRET
    JWT_SECRET: Joi.string().default('secret'),
    JWT_ALGORITHM: Joi.string().valid(
        'HS256' , 'HS384' , 'HS512' ,
        'RS256' , 'RS384' , 'RS512' ,
        'ES256' , 'ES384' , 'ES512' ,
        'PS256' , 'PS384' , 'PS512' ,
        'none'
    ).default('HS256'),
    JWT_EXPIRES_IN: Joi.number().integer().min(100).max(3000).default(3600),
});
