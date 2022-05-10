import request from "supertest";
import { httpServer } from "../../src/http/httpServer";
import { EnvVars } from "../../src/lib/EnvVars";
import { GreetingStore } from "../../src/storage/greeting/GreetingStore";
import { GreetingStoreInMemory } from "../../src/storage/greeting/GreetingStoreInMemory";
import { Greeting } from "../../src/storage/greeting/IGreetingStore";
import { config } from "../config";


// mock contract
jest.mock("ethers", () => {
    const originalModule = jest.requireActual("ethers");
    return {
        __esModule: true,
        ...originalModule,
        Contract: jest.fn().mockImplementation(() => {
            return {
                greet: () => {
                    return [
                        "hello world from contract",
                        "0xdeadbeef"
                    ];
                }
            };
        })
    };
});


if (!config.skipTests.includes("retrieveGreeting")) {
    beforeEach(async () => {
        const greetingStore = GreetingStore.get();
        (<GreetingStoreInMemory> greetingStore).clear();
        await greetingStore.add({
            text: "hello world from database",
            setter: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
        });
    });


    it("should retrieve the current greeting", async () => {
        const response = await request(httpServer)
            .get("/greeting")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);
        const greeting = <Greeting> response.body.data.greeting;
        expect(greeting.text).toEqual("hello world from contract");
        expect(greeting.setter).toEqual("0xdeadbeef");
    });


    it("should retrieve a setters greeting", async () => {
        const response = await request(httpServer)
            .get("/greeting")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .query({
                setter: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
            })
            .expect(200);

        const greeting = <Greeting> response.body.data.greeting;
        expect(greeting.text).toEqual("hello world from database");
        expect(greeting.setter).toEqual("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
    });


    it("should throw in case of an invalid setter", async () => {
        await request(httpServer)
            .get("/greeting")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .query({
                setter: "0xabcdef"
            })
            .expect(400);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}