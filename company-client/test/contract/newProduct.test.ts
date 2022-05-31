import { initContractListeners } from "../../src/contract";
import { EventBus } from "../../src/contract/interfaces/EventBus";
import { BlockchainInfoStore } from "../../src/storage/blockchain/BlockchainInfoStore";
import { BlockchainInfoStoreInMemory } from "../../src/storage/blockchain/BlockchainInfoStoreInMemory";
import { NewProductStore } from "../../src/storage/new-product/NewProductStore";
import { NewProductStoreInMemory } from "../../src/storage/new-product/NewProductStoreInMemory";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { config } from "../config";
import { TEST_NEW_PRODUCT, TEST_NEW_PRODUCT_EVENT_PARAMS, TEST_PRODUCT } from "../constants";


// mock EventBus contract
type EventListener = (...args: unknown[]) => Promise<void>;

let newProductListener = <EventListener> {};
const mockContract = <unknown> {
    on: (event: string, listener: EventListener): void => {
        if (event === "NewProduct") {
            newProductListener = listener;
        }
    }
};

// mock event
const event = {
    blockNumber: 10,
    getBlock: () => {
        return {
            timestamp: 10
        };
    }
};


if (!config.skipTests.includes("newProduct")) {
    const blockchainInfoStore = <BlockchainInfoStoreInMemory> BlockchainInfoStore.get();
    const newProductStore = <NewProductStoreInMemory> NewProductStore.get();
    const productStore = <ProductStoreInMemory> ProductStore.get();

    beforeEach(async () => {
        blockchainInfoStore.clear();
        newProductStore.clear();
        productStore.clear();
    });


    it("should successfully process a new product event", async () => {
        await initContractListeners(<EventBus> mockContract);
        await newProductListener(TEST_NEW_PRODUCT_EVENT_PARAMS.uid, TEST_NEW_PRODUCT_EVENT_PARAMS, event);

        const storedNewProduct = newProductStore.store[0];

        expect(storedNewProduct).toEqual(TEST_NEW_PRODUCT);
    });


    it("should skip events for already existing products", async () => {
        await productStore.upsert(TEST_PRODUCT);
        await initContractListeners(<EventBus> mockContract);
        await newProductListener(TEST_NEW_PRODUCT_EVENT_PARAMS.uid, TEST_NEW_PRODUCT_EVENT_PARAMS, event);

        const storedNewProduct = newProductStore.store[0];

        expect(storedNewProduct).toBeUndefined();
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}