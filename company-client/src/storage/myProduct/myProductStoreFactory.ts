import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { MyProductStoreInMemory } from "./MyProductStoreInMemory";
import { MyProductStoreMongoDB } from "./MyProductStoreMongoDB";
import { IMyProductStore } from "./IMyProductStore";


export function createMyProductStore(type: StorageType): IMyProductStore {
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

function createInMemoryStore(): IMyProductStore {
    return new MyProductStoreInMemory();
}

function createMongoDbStore(): IMyProductStore {
    return new MyProductStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}