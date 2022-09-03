import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyNewProductStore } from "../../src/storage/my-new-product/MyNewProductStore";
import { MyNewProductStoreInMemory } from "../../src/storage/my-new-product/MyNewProductStoreInMemory";
import { MyNewProduct } from "../../src/types";
import { config } from "../config";
import { TEST_NEW_PRODUCT } from "../data";


if (!config.skipTests.includes("getMyNewProducts")) {
    const server = initHttpServer();
    const myNewProductStore = (<MyNewProductStoreInMemory> MyNewProductStore.get());

    beforeEach(async () => {
        myNewProductStore.clear();
    });


    it("should get all my new products", async () => {
        const myNewProduct = { ...TEST_NEW_PRODUCT };
        await myNewProductStore.upsert(myNewProduct);
        myNewProduct.uid = "8181c8ae-eef1-4703-8498-2cf25be2877c";
        await myNewProductStore.upsert(myNewProduct);

        const response = await request(server)
            .get("/my-new-products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);

        const myNewProducts = <MyNewProduct[]> response.body.data.myNewProducts;
        expect(myNewProducts.length).toEqual(2);
        expect(myNewProducts[0]).toEqual(TEST_NEW_PRODUCT);
        expect(myNewProducts[1]).toEqual(myNewProduct);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}