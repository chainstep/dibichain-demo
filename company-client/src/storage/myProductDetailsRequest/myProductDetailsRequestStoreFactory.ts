import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { IMyProductDetailsRequestStore } from "./IMyProductDetailsRequestStore";
import { MyProductDetailsRequestStoreInMemory } from "./MyProductDetailsRequestStoreInMemory";
import { MyProductDetailsRequestStoreMongoDB } from "./MyProductDetailsRequestStoreMongoDB";


export function createMyProductDetailsRequestStore(type: StorageType): IMyProductDetailsRequestStore {
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

function createInMemoryStore(): IMyProductDetailsRequestStore {
    return new MyProductDetailsRequestStoreInMemory();
}

function createMongoDbStore(): IMyProductDetailsRequestStore {
    return new MyProductDetailsRequestStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}