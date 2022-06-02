import request from "supertest";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyNewProductStore } from "../../src/storage/my-new-product/MyNewProductStore";
import { MyNewProductStoreInMemory } from "../../src/storage/my-new-product/MyNewProductStoreInMemory";
import { MyProductStore } from "../../src/storage/my-product/MyProductStore";
import { MyProductStoreInMemory } from "../../src/storage/my-product/MyProductStoreInMemory";
import { config } from "../config";
import { TEST_NEW_PRODUCT, TEST_PRODUCT } from "../constants";


// mock axios
jest.mock("axios", () => {
    return {
        post: async (url: string, data: never): Promise<void> => {
            try {
                const { id, uid, name, hash, type, number } = data;
                expect(url).toEqual("http://operator.dummy.io/new-products");
                expect(id).toEqual(TEST_NEW_PRODUCT.id);
                expect(uid).toEqual(TEST_NEW_PRODUCT.uid);
                expect(name).toEqual(TEST_NEW_PRODUCT.name);
                expect(type).toEqual(TEST_NEW_PRODUCT.type);
                expect(number).toEqual(TEST_NEW_PRODUCT.number);
                expect(hash).toEqual(TEST_NEW_PRODUCT.hash);
            } catch (error) {
                console.error((<Error> error).message);
                throw error;
            }
        }
    };
});


if (!config.skipTests.includes("postMyNewProduct")) {
    const myProductStore = (<MyProductStoreInMemory> MyProductStore.get());
    const myNewProductStore = (<MyNewProductStoreInMemory> MyNewProductStore.get());

    beforeEach(async () => {
        myProductStore.clear();
        myNewProductStore.clear();
    });


    it("should post my new product", async () => {
        await myProductStore.upsert(TEST_PRODUCT);

        await request(httpServer)
            .post("/my-new-products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(TEST_NEW_PRODUCT)
            .expect(200);

        const myNewProducts = myNewProductStore.store;

        expect(myNewProducts.length).toEqual(1);
        expect(myNewProducts[0]).toEqual({ ...TEST_NEW_PRODUCT, timestamp: 0 });
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}