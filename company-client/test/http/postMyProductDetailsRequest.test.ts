import request from "supertest";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyProductDetailsRequestStore } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStore";
import { MyProductDetailsRequestStoreInMemory } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStoreInMemory";
import { config } from "../config";
import { TEST_MY_PRODUCT_DETAILS_REQUEST } from "../constants";


// mock axios
jest.mock("axios", () => {
    return {
        post: async (url: string, data: never): Promise<void> => {
            const { uid, publicKey, algorithm } = data;
            expect(url).toEqual("http://operator.dummy.io/product-details-request");
            expect(uid).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.uid);
            expect(publicKey).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.publicKey);
            expect(algorithm).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.algorithm);
        }
    };
});

// mock Crypto
jest.mock("../../src/lib/Crypto", () => {
    return {
        Crypto: jest.fn().mockImplementation(() => {
            return {
                generateKeyPair: (): { privateKey: string, publicKey: string, algorithm: string } => {
                    return {
                        algorithm: TEST_MY_PRODUCT_DETAILS_REQUEST.algorithm,
                        privateKey: TEST_MY_PRODUCT_DETAILS_REQUEST.privateKey,
                        publicKey: TEST_MY_PRODUCT_DETAILS_REQUEST.publicKey
                    };
                }
            };
        })
    };
});


if (!config.skipTests.includes("postProductDetailsRequest")) {
    const myProductDetailsRequestStore = (<MyProductDetailsRequestStoreInMemory> MyProductDetailsRequestStore.get());

    beforeEach(async () => {
        myProductDetailsRequestStore.clear();
    });


    it("should post my product details request", async () => {
        await request(httpServer)
            .post("/my-product-details-requests")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send({
                uid: TEST_MY_PRODUCT_DETAILS_REQUEST.uid
            })
            .expect(200);

        const myProductDetailsRequest = myProductDetailsRequestStore.store[0];
        expect(myProductDetailsRequest).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}