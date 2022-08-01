import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { IBlockchainInfoStore } from "./IBlockchainInfoStore";
import { BlockchainInfoStoreInMemory } from "./BlockchainInfoStoreInMemory";
import { BlockchainInfoStoreMongoDB } from "./BlockchainInfoStoreMongoDB";


export function createBlockchainInfoStore(type: StorageType): IBlockchainInfoStore {
    switch (type) {
        case StorageType.IN_MEMORY: {
            return createInMemoryStore();
        }
        case StorageType.MONGO_DB: {
            return createMongoDbStore();
        }
        default: {
            return createInMemoryStore();
        }
    }
}

function createInMemoryStore(): IBlockchainInfoStore {
    return new BlockchainInfoStoreInMemory();
}

function createMongoDbStore(): IBlockchainInfoStore {
    return new BlockchainInfoStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}