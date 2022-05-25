import request from "supertest";
import { Contracts } from "../../src/contract/Contracts";
import { EventBus } from "../../src/contract/interfaces/EventBus";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { config } from "../config";
import { TEST_PRODUCT_DETAILS_REQUEST } from "../constants";


// mock eventBus contract
const mockContract = <unknown> {
    async broadcastProductDetailsRequest(request: {
        uid: string;
        pubKey: string;
        algorithm: string;
    }): Promise<void> {
        try {
            expect(request).toEqual(TEST_PRODUCT_DETAILS_REQUEST);
        } catch (error) {
            console.log((<Error> error).message);
            throw error;
        }
    }
};


if (!config.skipTests.includes("postProductDetailsRequest")) {
    Contracts.init({
        eventBus: <EventBus> mockContract
    });

    it("should post a product details request", async () => {
        await request(httpServer)
            .post("/product-details-request")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(TEST_PRODUCT_DETAILS_REQUEST)
            .expect(200);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}