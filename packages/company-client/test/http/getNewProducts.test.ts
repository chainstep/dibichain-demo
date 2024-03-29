import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { NewProductStore } from "../../src/storage/new-product/NewProductStore";
import { NewProductStoreInMemory } from "../../src/storage/new-product/NewProductStoreInMemory";
import { NewProduct } from "../../src/types";
import { config } from "../config";
import { TEST_NEW_PRODUCT } from "../data";


if (!config.skipTests.includes("getNewProducts")) {
    const server = initHttpServer();
    const newProductStore = (<NewProductStoreInMemory> NewProductStore.get());

    beforeEach(async () => {
        newProductStore.clear();
    });


    it("should get all new products", async () => {
        const newProduct = { ...TEST_NEW_PRODUCT };
        await newProductStore.upsert(newProduct);
        newProduct.uid = "8181c8ae-eef1-4703-8498-2cf25be2877c";
        await newProductStore.upsert(newProduct);

        const response = await request(server)
            .get("/new-products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);

        const newProducts = <NewProduct[]> response.body.data.newProducts;
        expect(newProducts.length).toEqual(2);
        expect(newProducts[0]).toEqual(TEST_NEW_PRODUCT);
        expect(newProducts[1]).toEqual(newProduct);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}