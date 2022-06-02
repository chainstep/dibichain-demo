import { BlockchainInfoStore } from "../src/storage/blockchain/BlockchainInfoStore";
import { createBlockchainInfoStore } from "../src/storage/blockchain/blockchainInfoStoreFactory";
import { MyNewProductStore } from "../src/storage/my-new-product/MyNewProductStore";
import { createMyNewProductStore } from "../src/storage/my-new-product/myNewProductStoreFactory";
import { MyProductDetailsRequestStore } from "../src/storage/my-product-details-request/MyProductDetailsRequestStore";
import { createMyProductDetailsRequestStore } from "../src/storage/my-product-details-request/myProductDetailsRequestStoreFactory";
import { MyProductStore } from "../src/storage/my-product/MyProductStore";
import { createMyProductStore } from "../src/storage/my-product/myProductStoreFactory";
import { NewProductStore } from "../src/storage/new-product/NewProductStore";
import { createNewProductStore } from "../src/storage/new-product/newProductStoreFactory";
import { ProductDetailsRequestStore } from "../src/storage/product-details-request/ProductDetailsRequestStore";
import { createProductDetailsRequestStore } from "../src/storage/product-details-request/productDetailsRequestStoreFactory";
import { ProductStore } from "../src/storage/product/ProductStore";
import { createProductStore } from "../src/storage/product/productStoreFactory";
import { StorageType } from "../src/storage/StorageType";
import { DummyTransport, initLogger } from "../src/utils/logger";


jest.setTimeout(100 * 1000);

MyProductStore.init(createMyProductStore(StorageType.IN_MEMORY));
ProductStore.init(createProductStore(StorageType.IN_MEMORY));
BlockchainInfoStore.init(createBlockchainInfoStore(StorageType.IN_MEMORY));
NewProductStore.init(createNewProductStore(StorageType.IN_MEMORY));
MyNewProductStore.init(createMyNewProductStore(StorageType.IN_MEMORY));
MyProductDetailsRequestStore.init(createMyProductDetailsRequestStore(StorageType.IN_MEMORY));
ProductDetailsRequestStore.init(createProductDetailsRequestStore(StorageType.IN_MEMORY));

initLogger({
    level: "all",
    transports: [
        new DummyTransport(),
        // new ConsoleTransport(),
    ]
});