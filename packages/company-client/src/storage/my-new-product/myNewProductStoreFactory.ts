import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { IMyNewProductStore } from "./IMyNewProductStore";
import { MyNewProductStoreInMemory } from "./MyNewProductStoreInMemory";
import { MyNewProductStoreMongoDB } from "./MyNewProductStoreMongoDB";


export function createMyNewProductStore(type: StorageType): IMyNewProductStore {
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

function createInMemoryStore(): IMyNewProductStore {
    return new MyNewProductStoreInMemory();
}

function createMongoDbStore(): IMyNewProductStore {
    return new MyNewProductStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}