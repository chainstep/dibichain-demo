import request from "supertest";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT } from "../constants";


// mock axios
jest.mock("axios", () => {
    return {
        post: async (url: string, data: never): Promise<void> => {
            const { id, uid, name, hash, type, number } = data;
            expect(url).toEqual("http://operator.dummy.io/products");
            expect(id).toEqual(TEST_PRODUCT.id);
            expect(uid).toEqual(TEST_PRODUCT.uid);
            expect(name).toEqual(TEST_PRODUCT.name);
            expect(type).toEqual(TEST_PRODUCT.type);
            expect(number).toEqual(TEST_PRODUCT.number);
            expect(hash).toEqual("ab393730632e6b821d2c512e3336e9e45eaa23f742c21045317930b6830bee90");
        }
    };
});


if (!config.skipTests.includes("postProduct")) {
    const productStore = (<ProductStoreInMemory> ProductStore.get());

    beforeEach(async () => {
        productStore.clear();
    });


    it("should post a product", async () => {
        await request(httpServer)
            .post("/products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(TEST_PRODUCT)
            .expect(200);

        const product = productStore.store[0];

        expect(product.amount).toEqual(TEST_PRODUCT.amount);
        expect(product.amountUnit?.toLowerCase()).toEqual(TEST_PRODUCT.amountUnit?.toLowerCase());
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