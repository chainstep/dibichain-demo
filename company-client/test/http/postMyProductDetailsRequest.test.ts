import request from "supertest";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { KeyStore } from "../../src/storage/key/KeyStore";
import { KeyStoreInMemory } from "../../src/storage/key/KeyStoreInMemory";
import { MyProductDetailsRequestStore } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStore";
import { MyProductDetailsRequestStoreInMemory } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStoreInMemory";
import { NewProductStore } from "../../src/storage/new-product/NewProductStore";
import { NewProductStoreInMemory } from "../../src/storage/new-product/NewProductStoreInMemory";
import { config } from "../config";
import { TEST_KEY, TEST_MY_PRODUCT_DETAILS_REQUEST, TEST_NEW_PRODUCT } from "../constants";


// mock axios
jest.mock("axios", () => {
    return {
        post: async (url: string, data: never): Promise<void> => {
            try {
                const { uid, publicKey, algorithm } = data;
                expect(url).toEqual("http://operator.dummy.io/product-details-requests");
                expect(uid).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.uid);
                expect(publicKey).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.publicKey);
                expect(algorithm).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.algorithm);
            } catch (error) {
                console.error((<Error> error).message);
                throw error;
            }
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
                        privateKey: TEST_KEY.privateKey,
                        publicKey: TEST_KEY.publicKey
                    };
                }
            };
        })
    };
});


if (!config.skipTests.includes("postMyProductDetailsRequest")) {
    const newProductStore = (<NewProductStoreInMemory> NewProductStore.get());
    const myProductDetailsRequestStore = (<MyProductDetailsRequestStoreInMemory> MyProductDetailsRequestStore.get());
    const keyStore = (<KeyStoreInMemory> KeyStore.get());

    beforeEach(async () => {
        myProductDetailsRequestStore.clear();
        keyStore.clear();
        newProductStore.clear();
    });


    it("should post my product details request", async () => {
        await newProductStore.upsert(TEST_NEW_PRODUCT);

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