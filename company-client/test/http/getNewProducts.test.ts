import request from "supertest";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { NewProductStore } from "../../src/storage/newProduct/NewProductStore";
import { NewProductStoreInMemory } from "../../src/storage/newProduct/NewProductStoreInMemory";
import { NewProduct } from "../../src/types";
import { config } from "../config";
import { TEST_NEW_PRODUCT } from "../constants";


if (!config.skipTests.includes("getNewProducts")) {
    const newProductStore = (<NewProductStoreInMemory> NewProductStore.get());

    beforeEach(async () => {
        newProductStore.clear();
    });


    it("should get all new products", async () => {
        const newProduct = { ...TEST_NEW_PRODUCT };
        newProductStore.add(newProduct);
        newProduct.uid = "8181c8ae-eef1-4703-8498-2cf25be2877c";
        newProductStore.add(newProduct);

        const response = await request(httpServer)
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