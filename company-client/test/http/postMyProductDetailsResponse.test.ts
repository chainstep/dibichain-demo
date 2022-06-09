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
let messageSent = false;
jest.mock("axios", () => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        post: async (url: string, data: any): Promise<void> => {
            messageSent = true;
            try {
                const { publicKey, message, uid } = data;
                expect(url).toEqual("http://operator.dummy.io/product-details-responses");
                expect(publicKey).toEqual(TEST_PRODUCT_DETAILS_REQUEST.publicKey);
                expect(uid).toEqual(TEST_PRODUCT_DETAILS_REQUEST.uid);
                expect(message.secret).toBeDefined();
                expect(message.cipherText).toBeDefined();
                expect(message.initVector).toBeDefined();
            } catch (error) {
                console.error((<Error> error).message);
                throw error;
            }
        }
    };
});


if (!config.skipTests.includes("postMyProductDetailsResponse")) {
    const productDetailsRequestStore = (<ProductDetailsRequestStoreInMemory> ProductDetailsRequestStore.get());
    const myProductStore = (<MyProductStoreInMemory> MyProductStore.get());

    beforeEach(async () => {
        productDetailsRequestStore.clear();
        myProductStore.clear();
        messageSent = false;
    });


    it("should post my product details response", async () => {
        await myProductStore.upsert(TEST_PRODUCT);
        await productDetailsRequestStore.upsert(TEST_PRODUCT_DETAILS_REQUEST);

        await request(httpServer)
            .post("/my-product-details-responses")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send({
                uid: TEST_PRODUCT_DETAILS_REQUEST.uid,
                publicKey: TEST_PRODUCT_DETAILS_REQUEST.publicKey
            })
            .expect(200);

        const productDetailsRequests = await productDetailsRequestStore.find({ uid: TEST_PRODUCT_DETAILS_REQUEST.uid });

        expect(messageSent).toEqual(true);
        expect(productDetailsRequests[0].responded).toEqual(true);
    });


    it("should decline my product details response", async () => {
        await myProductStore.upsert(TEST_PRODUCT);
        await productDetailsRequestStore.upsert(TEST_PRODUCT_DETAILS_REQUEST);

        await request(httpServer)
            .post("/my-product-details-responses")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send({
                uid: TEST_PRODUCT_DETAILS_REQUEST.uid,
                publicKey: TEST_PRODUCT_DETAILS_REQUEST.publicKey,
                decline: true
            })
            .expect(200);

        const productDetailsRequests = await productDetailsRequestStore.find({ uid: TEST_PRODUCT_DETAILS_REQUEST.uid });

        expect(messageSent).toEqual(false);
        expect(productDetailsRequests[0].responded).toEqual(true);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}