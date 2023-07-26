/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { Injectable, Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectModel, MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, SchemaTypes,Types } from 'mongoose';

import { Commons } from 'src/shared/commons';
import { AppException, MethodOutputDto } from 'src/shared/dtos';

import { CONNECTION_NAME } from '../mongoose.config.module';

/**
 * START - SCHEMA INFORMATION 
 * 1. Add your schema information in the below pattern 
 * 2. Keep the name of the variables in context with Collection being integrated with
 */
@Schema({ collection: 'collection_master' })
class CollectionMaster {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId;

    @Prop({ unique: true, minlength: 5, maxlength: 10, required: true })
    user_id: string;
    
}

const CollectionMasterSchema = SchemaFactory.createForClass(CollectionMaster);
type CollectionMasterDocument = CollectionMaster & Document;
/** END - SCHEMA INFORMATION */

export class LockdocsUsersMasterException extends AppException {
    constructor(baseError: Error, message: string) {
        super(baseError, message);
    }
}

export type CollectionMasterDocumentDto = {
    id?: string;
    userId?: string;
}

@Injectable()
export class CollectionMasterService {
    
    private readonly className = CollectionMasterService.name;
    private readonly logger = new Logger(this.className);

    constructor(@InjectModel(CollectionMaster.name) private collectionMasterModel: Model<CollectionMasterDocument>) {}

    public async getCollectionById(
        input: {
            request: CollectionMasterDocumentDto
            _meta?: any
        }
    ): Promise<MethodOutputDto<Error, { user: CollectionMasterDocumentDto }>> {
        const { request: { userId }} = input;
        
        const [ errorFind, resultFind ] = await Commons.tc(this.collectionMasterModel.findOne({ user_id: userId }));

        if(errorFind) {
            throw new LockdocsUsersMasterException(errorFind, '');
        }

        return new MethodOutputDto({
            result: {
                message: 'User Retrieval Completed',
                data: {
                    user: resultFind || {
                        id: resultFind.id,
                        userId: resultFind.user_id,
                    },
                },
            },
        });
    }

}

@Module({
    imports: [ MongooseModule.forFeature([ { name:  CollectionMaster.name, schema: CollectionMasterSchema } ], CONNECTION_NAME) ],
    providers: [ CollectionMasterService ],
    exports: [ CollectionMasterService ],
})
export class CollectionMasterModule implements OnModuleInit, OnModuleDestroy {
    private readonly className = CollectionMasterModule.name;
    private readonly logger = new Logger(this.className);

    onModuleInit(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleInit(this.className));
    }

    onModuleDestroy(): void {
        this.logger.debug(Commons.MessageGenerator.ModuleLifeCycle.onModuleDestroy(this.className));
    }
}
