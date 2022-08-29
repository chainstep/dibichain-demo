import { ProductDetailsRequestTimeoutService } from "../../src/interval/handlers/product-details-request-timeout/ProductDetailsRequestTimeoutService";
import { MyProductDetailsRequestStore } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStore";
import { MyProductDetailsRequestStoreInMemory } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStoreInMemory";
import { config } from "../config";
import { TEST_MY_PRODUCT_DETAILS_REQUEST } from "../constants";


if (!config.skipTests.includes("productDetailsRequestTimeout")) {
    const myProductDetailsRequestStore = (<MyProductDetailsRequestStoreInMemory> MyProductDetailsRequestStore.get());

    beforeEach(async () => {
        myProductDetailsRequestStore.clear();
    });


    it("should timeout a product details request", async () => {
        const nowMinus2min = Math.floor(new Date().getTime() / 1000) - (2 * 60);
        await myProductDetailsRequestStore.upsert({ ...TEST_MY_PRODUCT_DETAILS_REQUEST, timestamp: nowMinus2min });

        const service = new ProductDetailsRequestTimeoutService({
            myProductDetailsRequestStore: MyProductDetailsRequestStore.get(),
            timeoutMin: 1
        });

        await service.run();

        const myProductDetailsRequest = myProductDetailsRequestStore.store[0];
        expect(myProductDetailsRequest.responded).toEqual(true);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}