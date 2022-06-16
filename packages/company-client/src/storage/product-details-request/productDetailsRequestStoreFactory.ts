import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { IProductDetailsRequestStore } from "./IProductDetailsRequestStore";
import { ProductDetailsRequestStoreInMemory } from "./ProductDetailsRequestStoreInMemory";
import { ProductDetailsRequestStoreMongoDB } from "./ProductDetailsRequestStoreMongoDB";


export function createProductDetailsRequestStore(type: StorageType): IProductDetailsRequestStore {
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

function createInMemoryStore(): IProductDetailsRequestStore {
    return new ProductDetailsRequestStoreInMemory();
}

function createMongoDbStore(): IProductDetailsRequestStore {
    return new ProductDetailsRequestStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}