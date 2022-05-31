import request from "supertest";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyProductDetailsRequestStore } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStore";
import { MyProductDetailsRequestStoreInMemory } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStoreInMemory";
import { MyProductDetailsRequest } from "../../src/types";
import { config } from "../config";
import { TEST_MY_PRODUCT_DETAILS_REQUEST, TEST_PRODUCT_DETAILS_REQUEST } from "../constants";


if (!config.skipTests.includes("getMyProductDetailsRequests")) {
    const myProductDetailsRequestStore = (<MyProductDetailsRequestStoreInMemory> MyProductDetailsRequestStore.get());

    beforeEach(async () => {
        myProductDetailsRequestStore.clear();
    });


    it("should get all my product details requests", async () => {
        const myProductDetailsRequest = { ...TEST_MY_PRODUCT_DETAILS_REQUEST };
        await myProductDetailsRequestStore.upsert(myProductDetailsRequest);
        myProductDetailsRequest.uid = "8181c8ae-eef1-4703-8498-2cf25be2877c";
        await myProductDetailsRequestStore.upsert(myProductDetailsRequest);

        const response = await request(httpServer)
            .get("/my-product-details-requests")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);

        const myProductDetailsRequests = <MyProductDetailsRequest[]> response.body.data.myProductDetailsRequests;

        expect(myProductDetailsRequests.length).toEqual(2);
        const productDetailsRequest = { ...TEST_PRODUCT_DETAILS_REQUEST };
        productDetailsRequest.timestamp = 0;
        expect(myProductDetailsRequests[0]).toEqual(productDetailsRequest);
        productDetailsRequest.uid = "8181c8ae-eef1-4703-8498-2cf25be2877c";
        expect(myProductDetailsRequests[1]).toEqual(productDetailsRequest);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}