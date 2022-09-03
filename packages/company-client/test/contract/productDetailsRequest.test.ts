import { initContractListeners } from "../../src/contract";
import { EventBus } from "../../src/contract/interfaces/EventBus";
import { MyProductStore } from "../../src/storage/my-product/MyProductStore";
import { MyProductStoreInMemory } from "../../src/storage/my-product/MyProductStoreInMemory";
import { ProductDetailsRequestStore } from "../../src/storage/product-details-request/ProductDetailsRequestStore";
import { ProductDetailsRequestStoreInMemory } from "../../src/storage/product-details-request/ProductDetailsRequestStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT, TEST_PRODUCT_DETAILS_REQUEST, TEST_PRODUCT_DETAILS_REQUEST_EVENT_PARAMS } from "../data";


// mock EventBus contract
type EventListener = (...args: unknown[]) => Promise<void>;

let productDetailsRequestListener = <EventListener> {};
const mockContract = <unknown> {
    on: (event: string, listener: EventListener): void => {
        if (event === "ProductDetailsRequest") {
            productDetailsRequestListener = listener;
        }
    },
    provider: {
        getBlockNumber: (): number => {
            return 9;
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


if (!config.skipTests.includes("productDetailsRequest")) {
    const myProductStore = <MyProductStoreInMemory> MyProductStore.get();
    const productDetailsRequestStore = <ProductDetailsRequestStoreInMemory> ProductDetailsRequestStore.get();

    beforeEach(async () => {
        myProductStore.clear();
        productDetailsRequestStore.clear();
    });


    it("should successfully process a product details request event", async () => {
        const myProduct = { ...TEST_PRODUCT };
        await myProductStore.upsert(myProduct);
        myProduct.uid = "8181c8ae-eef1-4703-8498-2cf25be2877c";
        await myProductStore.upsert(myProduct);

        await initContractListeners(<EventBus> mockContract);
        await productDetailsRequestListener(
            TEST_PRODUCT_DETAILS_REQUEST_EVENT_PARAMS.uid,
            TEST_PRODUCT_DETAILS_REQUEST_EVENT_PARAMS,
            event
        );

        expect(productDetailsRequestStore.store.length).toEqual(1);
        const storedProductDetailsRequests = productDetailsRequestStore.store[0];
        expect(storedProductDetailsRequests).toEqual(TEST_PRODUCT_DETAILS_REQUEST);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}