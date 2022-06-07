import request from "supertest";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { ResponseProduct } from "../../src/types";
import { config } from "../config";
import { TEST_PRODUCT } from "../constants";


if (!config.skipTests.includes("getProducts")) {
    const productStore = (<ProductStoreInMemory> ProductStore.get());

    beforeEach(async () => {
        productStore.clear();
    });


    it("should get a product", async () => {
        await productStore.upsert(TEST_PRODUCT);

        const response = await request(httpServer)
            .get("/products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .query({ uid: TEST_PRODUCT.uid })
            .expect(200);

        const responseProduct = (<ResponseProduct[]> response.body.data.products)[0];
        expect(responseProduct.amount).toEqual("" + TEST_PRODUCT.amount);
        expect(responseProduct.amountUnit?.toLowerCase()).toEqual(TEST_PRODUCT.amountUnit);
        expect(responseProduct.carbonFootprint).toEqual("" + TEST_PRODUCT.carbonFootprint);
        expect(responseProduct.carbonFootprintUnit).toEqual(TEST_PRODUCT.carbonFootprintUnit);
        expect(responseProduct.documents).toEqual(TEST_PRODUCT.documents);
        expect(responseProduct.id).toEqual(TEST_PRODUCT.id);
        expect(responseProduct.name).toEqual(TEST_PRODUCT.name);
        expect(responseProduct.number).toEqual(TEST_PRODUCT.number);
        expect(responseProduct.type.toLowerCase()).toEqual(TEST_PRODUCT.type.toLowerCase());
        expect(responseProduct.uid).toEqual(TEST_PRODUCT.uid);
        expect(responseProduct.weight).toEqual("" + TEST_PRODUCT.weight);
        expect(responseProduct.weightUnit).toEqual(TEST_PRODUCT.weightUnit);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}