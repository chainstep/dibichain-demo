import request from "supertest";
import { Contracts } from "../../src/contract/Contracts";
import { EventBus } from "../../src/contract/interfaces/EventBus";
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
        try {
            expect(product.uid).toEqual(TEST_NEW_PRODUCT.uid);
            expect(product.id).toEqual(TEST_NEW_PRODUCT.id);
            expect(product.name).toEqual(TEST_NEW_PRODUCT.name);
            expect(product.Type).toEqual(TEST_NEW_PRODUCT.type);
            expect(product.number).toEqual(TEST_NEW_PRODUCT.number);
            expect(product.hash).toEqual(TEST_NEW_PRODUCT.hash);
        } catch (error) {
            console.log((<Error> error).message);
            throw error;
        }
    }
};


if (!config.skipTests.includes("postProduct")) {
    Contracts.init({
        eventBus: <EventBus> mockContract
    });

    it("should post a product", async () => {
        await request(httpServer)
            .post("/products")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send(TEST_NEW_PRODUCT)
            .expect(200);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}