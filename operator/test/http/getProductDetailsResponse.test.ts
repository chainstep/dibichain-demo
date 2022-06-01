import request from "supertest";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductDetailsResponse } from "../../src/storage/product-details-response/IProductDetailsResponseStore";
import { ProductDetailsResponseStore } from "../../src/storage/product-details-response/ProductDetailsResponseStore";
import { ProductDetailsResponseStoreInMemory } from "../../src/storage/product-details-response/ProductDetailsResponseStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT_DETAILS_RESPONSE } from "../constants";


if (!config.skipTests.includes("getProductDetailsResponse")) {
    const productDetailsResponseStore = (<ProductDetailsResponseStoreInMemory> ProductDetailsResponseStore.get());

    beforeEach(async () => {
        productDetailsResponseStore.clear();
    });


    it("should get a product details response", async () => {
        await productDetailsResponseStore.upsert({ ...TEST_PRODUCT_DETAILS_RESPONSE, timestamp: 0 });
        const response = await request(httpServer)
            .get("/product-details-responses")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .query({
                publicKey: TEST_PRODUCT_DETAILS_RESPONSE.publicKey,
                uid: TEST_PRODUCT_DETAILS_RESPONSE.uid
            })
            .expect(200);

        const productDetailsResponses = <ProductDetailsResponse[]> response.body.data.productDetailsResponses;
        expect(productDetailsResponses.length).toEqual(1);
        expect(productDetailsResponses[0]).toEqual({ ...TEST_PRODUCT_DETAILS_RESPONSE, timestamp: 0 });
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}