import request from "supertest";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { config } from "../config";


const requestProduct = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "Assembly",
    number: "EAN 20359483920",
    documents: [ "8181c8ae-eef1-4703-8498-2cf25be2877b"],
    amount: "1",
    amountUnit: "EACH",
    weight: "65.53",
    weightUnit: "kg",
    carbonFootprint: "1345",
    carbonFootprintUnit: "kg"
};


if (!config.skipTests.includes("postProduct")) {
    const productStore = (<ProductStoreInMemory> ProductStore.get());

    beforeEach(async () => {
        productStore.clear();
    });


    it("should post a product", async () => {
        await request(httpServer)
            .post("/products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(requestProduct)
            .expect(200);

        const product = productStore.store[0];

        expect(product.amount).toEqual(requestProduct.amount);
        expect(product.amountUnit?.toLowerCase()).toEqual(requestProduct.amountUnit.toLowerCase());
        expect(product.carbonFootprint).toEqual(requestProduct.carbonFootprint);
        expect(product.carbonFootprintUnit).toEqual(requestProduct.carbonFootprintUnit);
        expect(product.documents).toEqual(requestProduct.documents);
        expect(product.id).toEqual(requestProduct.id);
        expect(product.name).toEqual(requestProduct.name);
        expect(product.number).toEqual(requestProduct.number);
        expect(product.type.toLowerCase()).toEqual(requestProduct.type.toLowerCase());
        expect(product.uid).toEqual(requestProduct.uid);
        expect(product.weight).toEqual(requestProduct.weight);
        expect(product.weightUnit).toEqual(requestProduct.weightUnit);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}