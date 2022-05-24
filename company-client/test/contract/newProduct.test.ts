import { initContractListeners } from "../../src/contract/contract";
import { EventBus } from "../../src/contract/interfaces/EventBus";
import { BlockchainInfoStore } from "../../src/storage/blockchain/BlockchainInfoStore";
import { BlockchainInfoStoreInMemory } from "../../src/storage/blockchain/BlockchainInfoStoreInMemory";
import { NewProductStore } from "../../src/storage/newProduct/NewProductStore";
import { NewProductStoreInMemory } from "../../src/storage/newProduct/NewProductStoreInMemory";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { config } from "../config";
import { newProductEventParams, product } from "../constants";


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
        await newProductListener(newProductEventParams, event);

        const storedNewProduct = (<NewProductStoreInMemory> newProductStore).store[0];

        expect(storedNewProduct.hash).toEqual(newProductEventParams.hash);
        expect(storedNewProduct.id).toEqual(newProductEventParams.id);
        expect(storedNewProduct.timestamp).toEqual(10);
        expect(storedNewProduct.type).toEqual(newProductEventParams.Type);
        expect(storedNewProduct.name).toEqual(newProductEventParams.name);
        expect(storedNewProduct.number).toEqual(newProductEventParams.number);
        expect(storedNewProduct.uid).toEqual(newProductEventParams.uid);
    });


    it("should skip events for already existing products", async () => {
        await productStore.add(product);
        await initContractListeners(<EventBus> mockContract);
        await newProductListener(newProductEventParams, event);

        const storedNewProduct = (<NewProductStoreInMemory> newProductStore).store[0];

        expect(storedNewProduct).toBeUndefined();
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}