import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyProductStore } from "../../src/storage/my-product/MyProductStore";
import { MyProductStoreInMemory } from "../../src/storage/my-product/MyProductStoreInMemory";
import { config } from "../config";
import { TEST_PRODUCT } from "../data";


if (!config.skipTests.includes("httpOrigin")) {
    const server = initHttpServer();
    const myProductStore = <MyProductStoreInMemory> MyProductStore.get();

    beforeEach(async () => {
        myProductStore.clear();
    });


    it("should accept requests from known origins", async () => {
        await myProductStore.upsert(TEST_PRODUCT);
        await request(server)
            .get("/my-products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);
    });


    it("should revert requests from unknown origins", async () => {
        await request(server)
            .get("/my-products")
            .set("Origin", "http://unknown.domain")
            .expect(401);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}