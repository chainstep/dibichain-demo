import request from "supertest";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { config } from "../config";

const productRequest = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "Assembly",
    number: "EAN 20359483920",
    documents: [ "8181c8ae-eef1-4703-8498-2cf25be2877b"],
    amount: "1",
    "amount-unit": "EACH",
    weight: "65.53",
    "weight-unit": "kg",
    carbonfootprint: "1345",
    "carbonfootprint-unit": "kg"
};


if (!config.skipTests.includes("postProduct")) {
    const productStore = (<ProductStoreInMemory> ProductStore.get());

    beforeEach(async () => {
        productStore.clear();
    });


    it("should post a product", async () => {
        await request(httpServer)
            .post("/product")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(productRequest)
            .expect(200);

        const product = productStore.store[0];

        expect(product.amount).toEqual(productRequest.amount);
        expect(product.amountUnit?.toLowerCase()).toEqual(productRequest["amount-unit"].toLowerCase());
        expect(product.carbonFootprint).toEqual(productRequest.carbonfootprint);
        expect(product.carbonFootprintUnit).toEqual(productRequest["carbonfootprint-unit"]);
        expect(product.documents).toEqual(productRequest.documents);
        expect(product.id).toEqual(productRequest.id);
        expect(product.name).toEqual(productRequest.name);
        expect(product.number).toEqual(productRequest.number);
        expect(product.type.toLowerCase()).toEqual(productRequest.type.toLowerCase());
        expect(product.uid).toEqual(productRequest.uid);
        expect(product.weight).toEqual(productRequest.weight);
        expect(product.weightUnit).toEqual(productRequest["weight-unit"]);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}