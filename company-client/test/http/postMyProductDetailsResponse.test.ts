import request from "supertest";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyProductStore } from "../../src/storage/my-product/MyProductStore";
import { MyProductStoreInMemory } from "../../src/storage/my-product/MyProductStoreInMemory";
import { ProductDetailsRequestStore } from "../../src/storage/product-details-request/ProductDetailsRequestStore";
import { ProductDetailsRequestStoreInMemory } from "../../src/storage/product-details-request/ProductDetailsRequestStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT, TEST_PRODUCT_DETAILS_REQUEST } from "../constants";


// mock axios
jest.mock("axios", () => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        post: async (url: string, data: any): Promise<void> => {
            const { publicKey, message, uid } = data;
            expect(url).toEqual("http://operator.dummy.io/product-details-responses");
            expect(publicKey).toEqual(TEST_PRODUCT_DETAILS_REQUEST.publicKey);
            expect(uid).toEqual(TEST_PRODUCT_DETAILS_REQUEST.uid);
            expect(message.secret).toBeDefined();
            expect(message.cipherText).toBeDefined();
            expect(message.initVector).toBeDefined();
        }
    };
});


if (!config.skipTests.includes("postProductDetailsResponse")) {
    const productDetailsRequestStore = (<ProductDetailsRequestStoreInMemory> ProductDetailsRequestStore.get());
    const myProductStore = (<MyProductStoreInMemory> MyProductStore.get());

    beforeEach(async () => {
        productDetailsRequestStore.clear();
        myProductStore.clear();
    });


    it("should post my product details response", async () => {
        await myProductStore.add(TEST_PRODUCT);
        await productDetailsRequestStore.add(TEST_PRODUCT_DETAILS_REQUEST);

        await request(httpServer)
            .post("/my-product-details-responses")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send({
                uid: TEST_PRODUCT_DETAILS_REQUEST.uid
            })
            .expect(200);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}