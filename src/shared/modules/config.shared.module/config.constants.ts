/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { HttpStatus } from '@nestjs/common';

const CoreResponseConstants = {
    BAD_REQUEST: {
        STATUS: HttpStatus.BAD_REQUEST,
        CODE: 'BAD_REQUEST',
        MESSAGE: 'Validation Exception.',
    },
};

export const CONSTANTS = {

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

};
