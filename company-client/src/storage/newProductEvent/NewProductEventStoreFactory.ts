import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { INewProductEventStore } from "./INewProductEventStore";
import { NewProductEventStoreInMemory } from "./NewProductEventStoreInMemory";
import { NewProductEventStoreMongoDB } from "./NewProductEventStoreMongoDB";


export function createNewProductEventStore(type: StorageType): INewProductEventStore {
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

function createInMemoryStore(): INewProductEventStore {
    return new NewProductEventStoreInMemory();
}

function createMongoDbStore(): INewProductEventStore {
    return new NewProductEventStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}