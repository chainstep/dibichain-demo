import request from "supertest";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { Product, ResponseProduct } from "../../src/types";
import { config } from "../config";


const product: Product = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "assembly",
    number: "EAN 20359483920",
    documents: [ "8181c8ae-eef1-4703-8498-2cf25be2877b"],
    amount: 1,
    amountUnit: "each",
    weight: 65.53,
    weightUnit: "kg",
    carbonFootprint: 1345,
    carbonFootprintUnit: "kg"
};


if (!config.skipTests.includes("getProduct")) {
    const productStore = (<ProductStoreInMemory> ProductStore.get());

    beforeEach(async () => {
        productStore.clear();
    });


    it("should get a product", async () => {
        productStore.add(product);

        const response = await request(httpServer)
            .get("/products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .query({ uid: product.uid })
            .expect(200);

        const responseProduct = (<ResponseProduct[]> response.body.data.products)[0];
        expect(responseProduct.amount).toEqual("" + product.amount);
        expect(responseProduct.amountUnit?.toLowerCase()).toEqual(product.amountUnit);
        expect(responseProduct.carbonFootprint).toEqual("" + product.carbonFootprint);
        expect(responseProduct.carbonFootprintUnit).toEqual(product.carbonFootprintUnit);
        expect(responseProduct.documents).toEqual(product.documents);
        expect(responseProduct.id).toEqual(product.id);
        expect(responseProduct.name).toEqual(product.name);
        expect(responseProduct.number).toEqual(product.number);
        expect(responseProduct.type.toLowerCase()).toEqual(product.type.toLowerCase());
        expect(responseProduct.uid).toEqual(product.uid);
        expect(responseProduct.weight).toEqual("" + product.weight);
        expect(responseProduct.weightUnit).toEqual(product.weightUnit);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}