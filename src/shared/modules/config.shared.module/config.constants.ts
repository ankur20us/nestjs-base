/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { HttpStatus } from '@nestjs/common';

const CoreResponseConstants = {
    PASS: {
        STATUS: HttpStatus.OK,
        CODE: 'SUCCESS',
        MESSAGE: 'Succefully Completed the request.',
    },
    FAILURE: {
        STATUS: HttpStatus.INTERNAL_SERVER_ERROR,
        CODE: 'FAILURE',
        MESSAGE: 'Exception Occured.',
    },
    UNAUTHORIZED: {
        STATUS: HttpStatus.UNAUTHORIZED,
        CODE: 'UNAUTHORIZED',
        MESSAGE: 'Unauthorized.',
    },
    BAD_REQUEST: {
        STATUS: HttpStatus.BAD_REQUEST,
        CODE: 'BAD_REQUEST',
        MESSAGE: 'Validation Exception.',
    },
    FORBIDDEN_RESOURCE: {
        STATUS: HttpStatus.FORBIDDEN,
        CODE: 'FORBIDDEN_RESOURCE',
        MESSAGE: 'Forbidden resource.',
    },
    UNPROCESSABLE_ENTITY: {
        STATUS: HttpStatus.UNPROCESSABLE_ENTITY,
        CODE: 'UNPROCESSABLE_ENTITY',
        MESSAGE: 'Unprocessable entity.',
    },
};

const ModuleLifeCycle = {
    CLOSE: 'close',
    CONNECTED: 'connected',
    CONNECTING: 'connecting',
    ERROR: 'error',
    DISCONNECTED: 'disconnected',
    DISCONNECTING: 'disconnecting',
    READY: 'ready',
    RECONNECTED: 'reconnected',
};

export const CONSTANTS = {

    STRING: {
        BEARER: 'bearer',
    },

    ENV: {
        PRODUCTION: 'production',
        HEADERS: {
            CORRELATION_ID: { NAME: 'x-correlation-id' },
            AUTHORIZATION: { NAME: 'authorization' },
            TOTAL_TIME: { NAME: 'x-total-time' },
        },        
    },

    SESSION_CONTEXT: {
        ENTER: 'ENTER',
        EXIT: 'EXIT',
        NAME: 'REQUEST_SESSION',
    },

    RESPONSE: { ...CoreResponseConstants },

    MODULE_LIFECYCLE: { ...ModuleLifeCycle },

};
