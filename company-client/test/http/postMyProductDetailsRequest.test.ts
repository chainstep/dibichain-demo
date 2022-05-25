import request from "supertest";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyProductDetailsRequestStore } from "../../src/storage/myProductDetailsRequest/MyProductDetailsRequestStore";
import { MyProductDetailsRequestStoreInMemory } from "../../src/storage/myProductDetailsRequest/MyProductDetailsRequestStoreInMemory";
import { config } from "../config";
import { TEST_MY_PRODUCT_DETAILS_REQUEST } from "../constants";


// mock axios
jest.mock("axios", () => {
    return {
        post: async (url: string, data: never): Promise<void> => {
            const { uid, pubKey, algorithm } = data;
            expect(url).toEqual("http://operator.dummy.io/product-details-request");
            expect(uid).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.uid);
            expect(pubKey).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.pubKey);
            expect(algorithm).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.algorithm);
        }
    };
});

// mock Crypto
jest.mock("../../src/lib/Crypto", () => {
    return {
        Crypto: jest.fn().mockImplementation(() => {
            return {
                generateKey: (): { privKey: string, pubKey: string, algorithm: string } => {
                    return {
                        algorithm: TEST_MY_PRODUCT_DETAILS_REQUEST.algorithm,
                        privKey: TEST_MY_PRODUCT_DETAILS_REQUEST.privKey,
                        pubKey: TEST_MY_PRODUCT_DETAILS_REQUEST.pubKey
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


    it("should post a product details request", async () => {
        await request(httpServer)
            .post("/my-product-details-request")
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