import request from "supertest";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { config } from "../config";


const requestProduct = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "Assembly",
    number: "EAN 20359483920",
    hash: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
};

if (!config.skipTests.includes("postProduct")) {
    it("should post a product", async () => {
        await request(httpServer)
            .post("/products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(requestProduct)
            .expect(200);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}