import request from "supertest";
import { Contracts } from "../../src/contract/Contracts";
import { EventBus } from "../../src/contract/interfaces/EventBus";
import { httpServer } from "../../src/http/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { config } from "../config";


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
            expect(product.uid).toEqual(requestProduct.uid);
            expect(product.id).toEqual(requestProduct.id);
            expect(product.name).toEqual(requestProduct.name);
            expect(product.Type).toEqual(requestProduct.type);
            expect(product.number).toEqual(requestProduct.number);
            expect(product.hash).toEqual(requestProduct.hash);
        } catch (error) {
            console.log((<Error> error).message);
            throw error;
        }
    }
};

const requestProduct = {
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1a",
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "assembly",
    number: "EAN 20359483920",
    hash: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
};


if (!config.skipTests.includes("postProduct")) {
    Contracts.init({
        eventBus: <EventBus> mockContract
    });
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