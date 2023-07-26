/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { Commons } from 'src/shared/commons';
import { CONSTANTS } from 'src/shared/modules';

import { CollectionMasterModule } from './collection.master.schema';

/** 
 * 1. NAME OF THE CONNECTION
 * 2. Used to inject repository for a Collection under a specific Mongo Connection.
 * 3. SHOULD BE UNIQUE ACROSS THE NESTJS CONTEXT
 */
export const CONNECTION_NAME = 'MONGOOSE_CONNECTION_NAME';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: CONNECTION_NAME,
            useFactory: async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {

                const MODULE_NAME = MongooseConfigModule.name;
                const logger = new Logger(MODULE_NAME);
                
                const MONGO_CONNECTIONN_URL = configService.get<string>('MONGO.CONNECTION_URL');
                
                const options: MongooseModuleFactoryOptions = {
                    uri: MONGO_CONNECTIONN_URL,
                    connectionFactory: (connection) => {

                        connection.on(CONSTANTS.MODULE_LIFECYCLE.CONNECTED, () => {
                            logger.log(Commons.MessageGenerator.ModuleLifeCycle.onConnected(MODULE_NAME, CONNECTION_NAME));
                        });
                        connection.on(CONSTANTS.MODULE_LIFECYCLE.CONNECTING, () => logger.log('MongoDB connecting..'));
                        connection.on(CONSTANTS.MODULE_LIFECYCLE.ERROR, (error) => logger.error('MongoDB connection error:', error));
                        connection.on(CONSTANTS.MODULE_LIFECYCLE.DISCONNECTED, () => logger.debug('Disconnected from MongoDB'));
                        connection.on(CONSTANTS.MODULE_LIFECYCLE.DISCONNECTING, () => logger.log('MongoDB disconnecting..'));
                        connection.on(CONSTANTS.MODULE_LIFECYCLE.RECONNECTED, () => logger.log('MongoDB reconnected'));
                        connection.on(CONSTANTS.MODULE_LIFECYCLE.CLOSE, () => logger.log('MongoDB lost connection'));

                        return connection;
                    },
                };

                logger.debug(`MongooseConfigModule configuration ${JSON.stringify(options, null, 2)}`);

                return options;
            },
            inject: [ ConfigService ],
        }),
    ],
    /**
     * Keep on adding all the collections module in this array, if wanted to add more Collection Services
     */
    providers: [ CollectionMasterModule ],
    exports: [ CollectionMasterModule ],
})
export class MongooseConfigModule implements OnModuleInit, OnModuleDestroy {

    private readonly className = MongooseConfigModule.name;
    private readonly logger = new Logger(this.className);

    constructor(@InjectConnection(CONNECTION_NAME) private connection: Connection) { }

    async onModuleInit(): Promise<void> {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleInit(this.className));
    }

    async onModuleDestroy(): Promise<void> {
        await this.connection.close();
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleDestroy(this.className));
    }

}

