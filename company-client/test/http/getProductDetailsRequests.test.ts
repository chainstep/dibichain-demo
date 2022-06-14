import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductDetailsRequestStore } from "../../src/storage/product-details-request/ProductDetailsRequestStore";
import { ProductDetailsRequestStoreInMemory } from "../../src/storage/product-details-request/ProductDetailsRequestStoreInMemory";
import { MyProductDetailsRequest } from "../../src/types";
import { config } from "../config";
import { TEST_PRODUCT_DETAILS_REQUEST } from "../constants";


if (!config.skipTests.includes("getProductDetailsRequests")) {
    const server = initHttpServer();
    const productDetailsRequestStore = (<ProductDetailsRequestStoreInMemory> ProductDetailsRequestStore.get());

    beforeEach(async () => {
        productDetailsRequestStore.clear();
    });


    it("should get all product details requests", async () => {
        let productDetailsRequest = { ...TEST_PRODUCT_DETAILS_REQUEST };
        await productDetailsRequestStore.upsert(productDetailsRequest);
        productDetailsRequest.uid = "8181c8ae-eef1-4703-8498-2cf25be2877c";
        await productDetailsRequestStore.upsert(productDetailsRequest);

        const response = await request(server)
            .get("/product-details-requests")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);

        const productDetailsRequests = <MyProductDetailsRequest[]> response.body.data.productDetailsRequests;

        expect(productDetailsRequests.length).toEqual(2);
        productDetailsRequest = { ...TEST_PRODUCT_DETAILS_REQUEST };
        expect(productDetailsRequests[0]).toEqual(productDetailsRequest);
        productDetailsRequest.uid = "8181c8ae-eef1-4703-8498-2cf25be2877c";
        expect(productDetailsRequests[1]).toEqual(productDetailsRequest);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}