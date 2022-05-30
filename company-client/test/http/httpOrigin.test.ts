import request from "supertest";
import { httpServer } from "../../src/http";
import { ROUTE_NAMES } from "../../src/http/constants";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyProductStore } from "../../src/storage/my-product/MyProductStore";
import { MyProductStoreInMemory } from "../../src/storage/my-product/MyProductStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT } from "../constants";


if (!config.skipTests.includes("httpOrigin")) {
    const myProductStore = <MyProductStoreInMemory> MyProductStore.get();

    beforeEach(async () => {
        myProductStore.clear();
    });


    it("should accept requests from known origins", async () => {
        await myProductStore.add(TEST_PRODUCT);
        await request(httpServer)
            .get(ROUTE_NAMES.myProducts)
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);
    });


    it("should revert requests from unknown origins", async () => {
        await request(httpServer)
            .get(ROUTE_NAMES.myProducts)
            .set("Origin", "http://unknown.domain")
            .expect(401);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}