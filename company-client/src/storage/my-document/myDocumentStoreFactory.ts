import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { MyDocumentStoreInMemory } from "./MyDocumentStoreInMemory";
import { MyDocumentStoreMongoDB } from "./MyDocumentStoreMongoDB";
import { IMyDocumentStore } from "./IMyDocumentStore";


export function createMyDocumentStore(type: StorageType): IMyDocumentStore {
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

function createInMemoryStore(): IMyDocumentStore {
    return new MyDocumentStoreInMemory();
}

function createMongoDbStore(): IMyDocumentStore {
    return new MyDocumentStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}