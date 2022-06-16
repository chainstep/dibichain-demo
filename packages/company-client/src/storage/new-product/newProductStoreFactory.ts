import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { INewProductStore } from "./INewProductStore";
import { NewProductStoreInMemory } from "./NewProductStoreInMemory";
import { NewProductStoreMongoDB } from "./NewProductStoreMongoDB";


export function createNewProductStore(type: StorageType): INewProductStore {
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

function createInMemoryStore(): INewProductStore {
    return new NewProductStoreInMemory();
}

function createMongoDbStore(): INewProductStore {
    return new NewProductStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}