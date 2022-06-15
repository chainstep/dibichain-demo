import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { KeyStoreInMemory } from "./KeyStoreInMemory";
import { KeyStoreMongoDB } from "./KeyStoreMongoDB";
import { IKeyStore } from "./IKeyStore";


export function createKeyStore(type: StorageType): IKeyStore {
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

function createInMemoryStore(): IKeyStore {
    return new KeyStoreInMemory();
}

function createMongoDbStore(): IKeyStore {
    return new KeyStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}