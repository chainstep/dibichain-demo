import request from "supertest";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductDetailsRequestStore } from "../../src/storage/productDetailsRequest/ProductDetailsRequestStore";
import { ProductDetailsRequestStoreInMemory } from "../../src/storage/productDetailsRequest/ProductDetailsRequestStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT_DETAILS_REQUEST } from "../constants";


// mock axios
jest.mock("axios", () => {
    return {
        post: async (url: string, data: never): Promise<void> => {
            const { uid, pubKey, algorithm } = data;
            expect(url).toEqual("http://operator.dummy.io/product-details-request");
            expect(uid).toEqual(TEST_PRODUCT_DETAILS_REQUEST.uid);
            expect(pubKey).toEqual(TEST_PRODUCT_DETAILS_REQUEST.pubKey);
            expect(algorithm).toEqual(TEST_PRODUCT_DETAILS_REQUEST.algorithm);
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
                        algorithm: TEST_PRODUCT_DETAILS_REQUEST.algorithm,
                        privKey: TEST_PRODUCT_DETAILS_REQUEST.privKey,
                        pubKey: TEST_PRODUCT_DETAILS_REQUEST.pubKey
                    };
                }
            };
        })
    };
});


if (!config.skipTests.includes("postProductDetailsRequest")) {
    const productDetailsRequestStore = (<ProductDetailsRequestStoreInMemory> ProductDetailsRequestStore.get());

    beforeEach(async () => {
        productDetailsRequestStore.clear();
    });


    it("should post a product details request", async () => {
        await request(httpServer)
            .post("/product-details-request")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send({
                uid: TEST_PRODUCT_DETAILS_REQUEST.uid
            })
            .expect(200);

        const productDetailsRequest = productDetailsRequestStore.store[0];
        expect(productDetailsRequest).toEqual(TEST_PRODUCT_DETAILS_REQUEST);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}