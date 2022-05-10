import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { GreetingStoreInMemory } from "./GreetingStoreInMemory";
import { GreetingStoreMongoDB } from "./GreetingStoreMongoDB";
import { IGreetingStore } from "./IGreetingStore";


export function createGreetingStore(type: StorageType): IGreetingStore {
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

function createInMemoryStore(): IGreetingStore {
    return new GreetingStoreInMemory();
}

function createMongoDbStore(): IGreetingStore {
    return new GreetingStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}