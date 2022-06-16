import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { Product } from "../../src/types";
import { config } from "../config";
import { TEST_PRODUCT } from "../constants";


if (!config.skipTests.includes("getProducts")) {
    const server = initHttpServer();
    const productStore = (<ProductStoreInMemory> ProductStore.get());

    beforeEach(async () => {
        productStore.clear();
    });


    it("should get a product", async () => {
        await productStore.upsert(TEST_PRODUCT);

        const response = await request(server)
            .get("/products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .query({ uid: TEST_PRODUCT.uid })
            .expect(200);

        const product = (<Product[]> response.body.data.products)[0];

        expect(product.amount).toEqual(TEST_PRODUCT.amount);
        expect(product.amountUnit?.toLowerCase()).toEqual(TEST_PRODUCT.amountUnit);
        expect(product.carbonFootprint).toEqual(TEST_PRODUCT.carbonFootprint);
        expect(product.carbonFootprintUnit).toEqual(TEST_PRODUCT.carbonFootprintUnit);
        expect(product.documents).toEqual(TEST_PRODUCT.documents);
        expect(product.id).toEqual(TEST_PRODUCT.id);
        expect(product.name).toEqual(TEST_PRODUCT.name);
        expect(product.number).toEqual(TEST_PRODUCT.number);
        expect(product.type.toLowerCase()).toEqual(TEST_PRODUCT.type.toLowerCase());
        expect(product.uid).toEqual(TEST_PRODUCT.uid);
        expect(product.weight).toEqual(TEST_PRODUCT.weight);
        expect(product.weightUnit).toEqual(TEST_PRODUCT.weightUnit);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}