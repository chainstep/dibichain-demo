import request from "supertest";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyProductStore } from "../../src/storage/myProduct/MyProductStore";
import { MyProductStoreInMemory } from "../../src/storage/myProduct/MyProductStoreInMemory";
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


if (!config.skipTests.includes("postMyProduct")) {
    const myProductStore = (<MyProductStoreInMemory> MyProductStore.get());

    beforeEach(async () => {
        myProductStore.clear();
    });


    it("should post a product", async () => {
        await request(httpServer)
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