import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { IProductDetailsResponseStore } from "./IProductDetailsResponseStore";
import { ProductDetailsResponseStoreInMemory } from "./ProductDetailsResponseStoreInMemory";
import { ProductDetailsResponseStoreMongoDB } from "./ProductDetailsResponseStoreMongoDB";


export function createProductDetailsResponseStore(type: StorageType): IProductDetailsResponseStore {
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

function createInMemoryStore(): IProductDetailsResponseStore {
    return new ProductDetailsResponseStoreInMemory();
}

function createMongoDbStore(): IProductDetailsResponseStore {
    return new ProductDetailsResponseStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}