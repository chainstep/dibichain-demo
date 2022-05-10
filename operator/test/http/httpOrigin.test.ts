import request from "supertest";
import { ROUTE_NAMES } from "../../src/http/constants";
import { httpServer } from "../../src/http/httpServer";
import { EnvVars } from "../../src/lib/EnvVars";
import { config } from "../config";


if (!config.skipTests.includes("httpOrigin")) {
    it("should accept requests from known origins", async () => {
        await request(httpServer)
            .get(ROUTE_NAMES.greetings.retrieve)
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);
    });


    it("should revert requests from unknown origins", async () => {
        await request(httpServer)
            .get(ROUTE_NAMES.greetings.retrieve)
            .set("Origin", "http://unknown.domain")
            .expect(401);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}