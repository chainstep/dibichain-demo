import request from "supertest";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductDetailsResponseStore } from "../../src/storage/product-details-response/ProductDetailsResponseStore";
import { ProductDetailsResponseStoreInMemory } from "../../src/storage/product-details-response/ProductDetailsResponseStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT_DETAILS_RESPONSE } from "../constants";


if (!config.skipTests.includes("postProductDetailsResponse")) {
    const productDetailsResponseStore = (<ProductDetailsResponseStoreInMemory> ProductDetailsResponseStore.get());

    beforeEach(async () => {
        productDetailsResponseStore.clear();
    });


    it("should post a product details response", async () => {
        await request(httpServer)
            .post("/product-details-responses")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(TEST_PRODUCT_DETAILS_RESPONSE)
            .expect(200);

        const productDetailsResponse = productDetailsResponseStore.store[0];
        expect(productDetailsResponse.message).toEqual(TEST_PRODUCT_DETAILS_RESPONSE.message);
        expect(productDetailsResponse.publicKey).toEqual(TEST_PRODUCT_DETAILS_RESPONSE.publicKey);
        expect(productDetailsResponse.uid).toEqual(TEST_PRODUCT_DETAILS_RESPONSE.uid);
        expect(productDetailsResponse.timestamp).toBeDefined();
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}