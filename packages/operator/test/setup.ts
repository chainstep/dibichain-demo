import { ProductDetailsResponseStore } from "../src/storage/product-details-response/ProductDetailsResponseStore";
import { createProductDetailsResponseStore } from "../src/storage/product-details-response/productDetailsResponseStoreFactory";
import { StorageType } from "../src/storage/StorageType";
import { DummyTransport, initLogger } from "../src/utils/logger";


jest.setTimeout(100 * 1000);

ProductDetailsResponseStore.init(createProductDetailsResponseStore(StorageType.IN_MEMORY));

initLogger({
    level: "all",
    transports: [
        new DummyTransport(),
        // new ConsoleTransport()
    ]
});