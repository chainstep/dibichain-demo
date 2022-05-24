import request from "supertest";
import { ROUTE_NAMES } from "../../src/http/constants";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { ProductStore } from "../../src/storage/product/ProductStore";
import { ProductStoreInMemory } from "../../src/storage/product/ProductStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT } from "../constants";


if (!config.skipTests.includes("httpOrigin")) {
    const productStore = <ProductStoreInMemory> ProductStore.get();

    beforeEach(async () => {
        productStore.clear();
    });


    it("should accept requests from known origins", async () => {
        await productStore.add(TEST_PRODUCT);
        await request(httpServer)
            .get(ROUTE_NAMES.products)
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);
    });


    it("should revert requests from unknown origins", async () => {
        await request(httpServer)
            .get(ROUTE_NAMES.products)
            .set("Origin", "http://unknown.domain")
            .expect(401);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}