import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { ProductStoreInMemory } from "./ProductStoreInMemory";
import { ProductStoreMongoDB } from "./ProductStoreMongoDB";
import { IProductStore } from "./IProductStore";


export function createProductStore(type: StorageType): IProductStore {
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

function createInMemoryStore(): IProductStore {
    return new ProductStoreInMemory();
}

function createMongoDbStore(): IProductStore {
    return new ProductStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}