/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Commons } from 'src/shared/commons';

import { CONSTANTS } from './config.constants';

export const ConfigSharedSchema = () => ({
    // SYSTEM LEVEL CONFIG
    SYSTEM: {
        SERVICE_NAME: process.env.SYSTEM_SERVICE_NAME,
        NODE_ENV: process.env.NODE_ENV,
        PORT: parseInt(process.env.SYSTEM_PORT, 10),
        IS_PROD: Commons.compareString(process.env.SYSTEM_NODE_ENV, CONSTANTS.ENV.PRODUCTION),
    },

    // JWT CONFIG
    JWT: {
        SECRET: process.env.JWT_SECRET,
        ALGORITHM: process.env.JWT_ALGORITHM,
        EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN, 10),
    },

     // MONGO CONFIG
    MONGO: {
        CONNECTION_URL: process.env.MONGO_CONNECTION_URL,
    },

    // CONSTANTS
    CONSTANTS: { 
        ...CONSTANTS,    
    },

});
