import request from "supertest";
import { Contracts } from "../../src/contract/Contracts";
import { EventBus } from "../../src/contract/interfaces/EventBus";
import { ROUTE_NAMES } from "../../src/http/constants";
import { httpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { config } from "../config";
import { TEST_NEW_PRODUCT } from "../constants";


// mock eventBus contract
const mockContract = <unknown> {
    async broadcastNewProduct(product: {
        uid: string;
        id: string;
        name: string;
        Type: string;
        number: string;
        hash: string;
    }): Promise<void> {
       return;
    }
};


if (!config.skipTests.includes("httpOrigin")) {
    Contracts.init({
        eventBus: <EventBus> mockContract
    });

    it("should accept requests from known origins", async () => {
        await request(httpServer)
            .post(ROUTE_NAMES.newProducts)
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(TEST_NEW_PRODUCT)
            .expect(200);
    });


    it("should revert requests from unknown origins", async () => {
        await request(httpServer)
        .post(ROUTE_NAMES.newProducts)
        .set("Origin", "http://unknown.domain")
        .send(TEST_NEW_PRODUCT)
        .expect(401);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}