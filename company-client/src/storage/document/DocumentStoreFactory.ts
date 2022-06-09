import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { DocumentStoreInMemory } from "./DocumentStoreInMemory";
import { DocumentStoreMongoDB } from "./DocumentStoreMongoDB";
import { IDocumentStore } from "./IDocumentStore";


export function createDocumentStore(type: StorageType): IDocumentStore {
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

function createInMemoryStore(): IDocumentStore {
    return new DocumentStoreInMemory();
}

function createMongoDbStore(): IDocumentStore {
    return new DocumentStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}