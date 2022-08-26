import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyProductStore } from "../../src/storage/my-product/MyProductStore";
import { MyProductStoreInMemory } from "../../src/storage/my-product/MyProductStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT } from "../constants";


if (!config.skipTests.includes("postMyProduct")) {
    const server = initHttpServer();
    const myProductStore = (<MyProductStoreInMemory> MyProductStore.get());

    beforeEach(async () => {
        myProductStore.clear();
    });


    it("should post my product", async () => {
        await request(server)
            .post("/my-products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(TEST_PRODUCT)
            .expect(200);

        const myProduct = myProductStore.store[0];
        expect(myProduct.amount).toEqual(TEST_PRODUCT.amount);
        expect(myProduct.amountUnit?.toLowerCase()).toEqual(TEST_PRODUCT.amountUnit?.toLowerCase());
        expect(myProduct.carbonFootprint).toEqual(TEST_PRODUCT.carbonFootprint);
        expect(myProduct.carbonFootprintUnit).toEqual(TEST_PRODUCT.carbonFootprintUnit);
        expect(myProduct.documents).toEqual(TEST_PRODUCT.documents);
        expect(myProduct.id).toEqual(TEST_PRODUCT.id);
        expect(myProduct.name).toEqual(TEST_PRODUCT.name);
        expect(myProduct.number).toEqual(TEST_PRODUCT.number);
        expect(myProduct.type.toLowerCase()).toEqual(TEST_PRODUCT.type.toLowerCase());
        expect(myProduct.uid).toEqual(TEST_PRODUCT.uid);
        expect(myProduct.weight).toEqual(TEST_PRODUCT.weight);
        expect(myProduct.weightUnit).toEqual(TEST_PRODUCT.weightUnit);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}