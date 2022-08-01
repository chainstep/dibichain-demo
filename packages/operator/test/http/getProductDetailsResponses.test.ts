import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductDetailsResponseStore } from "../../src/storage/product-details-response/ProductDetailsResponseStore";
import { ProductDetailsResponseStoreInMemory } from "../../src/storage/product-details-response/ProductDetailsResponseStoreInMemory";
import { ProductDetailsResponse } from "../../src/types";
import { config } from "../config";
import { TEST_PRODUCT_DETAILS_RESPONSE } from "../constants";


if (!config.skipTests.includes("getProductDetailsResponse")) {
    const server = initHttpServer();
    const productDetailsResponseStore = (<ProductDetailsResponseStoreInMemory> ProductDetailsResponseStore.get());

    beforeEach(async () => {
        productDetailsResponseStore.clear();
    });


    it("should get product details responses", async () => {
        const publicKeys = [ "pubKey0", "pubKey1", "pubKey2", "pubKey3" ];
        await productDetailsResponseStore.upsert({ ...TEST_PRODUCT_DETAILS_RESPONSE, timestamp: 0 });
        await productDetailsResponseStore.upsert({
            ...TEST_PRODUCT_DETAILS_RESPONSE,
            timestamp: 0,
            publicKey: publicKeys[0]
        });
        await productDetailsResponseStore.upsert({
            ...TEST_PRODUCT_DETAILS_RESPONSE,
            timestamp: 0,
            publicKey: publicKeys[1]
        });
        await productDetailsResponseStore.upsert({
            ...TEST_PRODUCT_DETAILS_RESPONSE,
            timestamp: 0,
            publicKey: publicKeys[2]
        });
        await productDetailsResponseStore.upsert({
            ...TEST_PRODUCT_DETAILS_RESPONSE,
            timestamp: 0,
            publicKey: publicKeys[3]
        });

        const response = await request(server)
            .get("/product-details-responses")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .query({
                publicKeys: JSON.stringify([
                    TEST_PRODUCT_DETAILS_RESPONSE.publicKey,
                    publicKeys[0]
                ])
            })
            .expect(200);

        const productDetailsResponses = <ProductDetailsResponse[]> response.body.data.productDetailsResponses;
        expect(productDetailsResponses.length).toEqual(2);
        expect(productDetailsResponses[0]).toEqual({ ...TEST_PRODUCT_DETAILS_RESPONSE, timestamp: 0 });
        expect(productDetailsResponses[1]).toEqual({
            ...TEST_PRODUCT_DETAILS_RESPONSE,
            timestamp: 0,
            publicKey: publicKeys[0]
        });
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}