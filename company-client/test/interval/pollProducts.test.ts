import { PollProductsService } from "../../src/interval/services/PollProductsService";
import { Crypto } from "../../src/lib/Crypto";
import { EnvVars } from "../../src/lib/EnvVars";
import { Operator } from "../../src/lib/Operator";
import { DocumentStore } from "../../src/storage/document/DocumentStore";
import { DocumentStoreInMemory } from "../../src/storage/document/DocumentStoreInMemory";
import { KeyStore } from "../../src/storage/key/KeyStore";
import { KeyStoreInMemory } from "../../src/storage/key/KeyStoreInMemory";
import { MyProductDetailsRequestStore } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStore";
import { MyProductDetailsRequestStoreInMemory } from "../../src/storage/my-product-details-request/MyProductDetailsRequestStoreInMemory";
import { NewProductStore } from "../../src/storage/new-product/NewProductStore";
import { NewProductStoreInMemory } from "../../src/storage/new-product/NewProductStoreInMemory";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { config } from "../config";
import { TEST_DOCUMENT_1, TEST_DOCUMENT_2, TEST_DOCUMENT_3, TEST_KEY, TEST_MESSAGE, TEST_MY_PRODUCT_DETAILS_REQUEST, TEST_NEW_PRODUCT, TEST_PRODUCT } from "../constants";


// mock axios
jest.mock("axios", () => {
    return {
        get: async (url: string, data: never): Promise<unknown> => {
            try {
                const { params } = data;
                const { publicKeys } = params;
                const _publicKeys = <string[]>JSON.parse(publicKeys);

                expect(_publicKeys[0]).toEqual(TEST_MY_PRODUCT_DETAILS_REQUEST.publicKey);
                expect(url).toEqual("http://operator.dummy.io/product-details-responses");
                return {
                    data: {
                        data: {
                            productDetailsResponses: [{
                                publicKey: TEST_MY_PRODUCT_DETAILS_REQUEST.publicKey,
                                message: TEST_MESSAGE,
                                uid: TEST_MY_PRODUCT_DETAILS_REQUEST.uid
                            }]
                        }
                    }
                };
            } catch (error) {
                console.error((<Error> error).message);
                throw error;
            }
        }
    };
});


if (!config.skipTests.includes("pollProducts")) {
    const myProductDetailsRequestStore = (<MyProductDetailsRequestStoreInMemory> MyProductDetailsRequestStore.get());
    const keyStore = (<KeyStoreInMemory> KeyStore.get());
    const productStore = (<ProductStoreInMemory> ProductStore.get());
    const documentStore = (<DocumentStoreInMemory> DocumentStore.get());
    const newProductStore = (<NewProductStoreInMemory> NewProductStore.get());

    beforeEach(async () => {
        myProductDetailsRequestStore.clear();
        keyStore.clear();
        productStore.clear();
        documentStore.clear();
        newProductStore.clear();
    });


    it("should get all products", async () => {
        await myProductDetailsRequestStore.upsert(TEST_MY_PRODUCT_DETAILS_REQUEST);
        await keyStore.upsert(TEST_KEY);
        await newProductStore.upsert(TEST_NEW_PRODUCT);

        const service = new PollProductsService({
            getKeyStore: () => KeyStore.get(),
            getMyProductDetailsRequestStore: () => MyProductDetailsRequestStore.get(),
            getProductStore: () => ProductStore.get(),
            getNewProductStore: () => NewProductStore.get(),
            getDocumentStore: () => DocumentStore.get(),
            operator: new Operator({
                url: EnvVars.OPERATOR_URL,
                crypto: new Crypto()
            })
        });

        await service.run();
        const product = productStore.store[0];
        const documents = documentStore.store;

        expect(product).toEqual(TEST_PRODUCT);

        let index = documents.findIndex(document => document.uid === TEST_DOCUMENT_1.uid);
        expect(documents[index]).toEqual(TEST_DOCUMENT_1);
        index = documents.findIndex(document => document.uid === TEST_DOCUMENT_2.uid);
        expect(documents[index]).toEqual(TEST_DOCUMENT_2);
        index = documents.findIndex(document => document.uid === TEST_DOCUMENT_3.uid);
        expect(documents[index]).toEqual(TEST_DOCUMENT_3);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}