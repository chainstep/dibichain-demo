import { BlockchainInfoStore } from "../src/storage/blockchain/BlockchainInfoStore";
import { createBlockchainInfoStore } from "../src/storage/blockchain/blockchainInfoStoreFactory";
import { MyProductDetailsRequestStore } from "../src/storage/myProductDetailsRequest/MyProductDetailsRequestStore";
import { createMyProductDetailsRequestStore } from "../src/storage/myProductDetailsRequest/myProductDetailsRequestStoreFactory";
import { NewProductStore } from "../src/storage/newProduct/NewProductStore";
import { createNewProductStore } from "../src/storage/newProduct/newProductStoreFactory";
import { ProductStore } from "../src/storage/product/ProductStore";
import { createProductStore } from "../src/storage/product/productStoreFactory";
import { StorageType } from "../src/storage/StorageType";
import { DummyTransport, initLogger } from "../src/utils/logger";


jest.setTimeout(100 * 1000);

ProductStore.init(createProductStore(StorageType.IN_MEMORY));
BlockchainInfoStore.init(createBlockchainInfoStore(StorageType.IN_MEMORY));
NewProductStore.init(createNewProductStore(StorageType.IN_MEMORY));
MyProductDetailsRequestStore.init(createMyProductDetailsRequestStore(StorageType.IN_MEMORY));

initLogger({
    level: "all",
    transports: [
        new DummyTransport(),
        // new ConsoleTransport(),
    ]
});