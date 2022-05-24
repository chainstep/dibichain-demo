import { initContractListeners } from "../../src/contract/contract";
import { EventBus } from "../../src/contract/interfaces/EventBus";
import { BlockchainInfoStore } from "../../src/storage/blockchain/BlockchainInfoStore";
import { BlockchainInfoStoreInMemory } from "../../src/storage/blockchain/BlockchainInfoStoreInMemory";
import { NewProductStore } from "../../src/storage/newProduct/NewProductStore";
import { NewProductStoreInMemory } from "../../src/storage/newProduct/NewProductStoreInMemory";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { config } from "../config";
import { TEST_NEW_PRODUCT_EVENT_PARAMS, TEST_PRODUCT } from "../constants";


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
    const blockchainInfoStore = BlockchainInfoStore.get();
    const newProductStore = NewProductStore.get();
    const productStore = ProductStore.get();

    beforeEach(async () => {
        (<BlockchainInfoStoreInMemory> blockchainInfoStore).clear();
        (<NewProductStoreInMemory> newProductStore).clear();
        (<ProductStoreInMemory> productStore).clear();
    });


    it("should successfully process a new product event", async () => {
        await initContractListeners(<EventBus> mockContract);
        await newProductListener(TEST_NEW_PRODUCT_EVENT_PARAMS, event);

        const storedNewProduct = (<NewProductStoreInMemory> newProductStore).store[0];

        expect(storedNewProduct.hash).toEqual(TEST_NEW_PRODUCT_EVENT_PARAMS.hash);
        expect(storedNewProduct.id).toEqual(TEST_NEW_PRODUCT_EVENT_PARAMS.id);
        expect(storedNewProduct.timestamp).toEqual(10);
        expect(storedNewProduct.type).toEqual(TEST_NEW_PRODUCT_EVENT_PARAMS.Type);
        expect(storedNewProduct.name).toEqual(TEST_NEW_PRODUCT_EVENT_PARAMS.name);
        expect(storedNewProduct.number).toEqual(TEST_NEW_PRODUCT_EVENT_PARAMS.number);
        expect(storedNewProduct.uid).toEqual(TEST_NEW_PRODUCT_EVENT_PARAMS.uid);
    });


    it("should skip events for already existing products", async () => {
        await productStore.add(TEST_PRODUCT);
        await initContractListeners(<EventBus> mockContract);
        await newProductListener(TEST_NEW_PRODUCT_EVENT_PARAMS, event);

        const storedNewProduct = (<NewProductStoreInMemory> newProductStore).store[0];

        expect(storedNewProduct).toBeUndefined();
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}