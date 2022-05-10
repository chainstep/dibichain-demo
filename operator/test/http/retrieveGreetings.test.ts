import request from "supertest";
import { httpServer } from "../../src/http/httpServer";
import { EnvVars } from "../../src/lib/EnvVars";
import { GreetingStore } from "../../src/storage/greeting/GreetingStore";
import { GreetingStoreInMemory } from "../../src/storage/greeting/GreetingStoreInMemory";
import { Greeting } from "../../src/storage/greeting/IGreetingStore";
import { config } from "../config";


if (!config.skipTests.includes("retrieveGreetings")) {
    beforeEach(async () => {
        const greetingStore = GreetingStore.get();
        (<GreetingStoreInMemory> greetingStore).clear();

        for (let i = 0 ; i < 20 ; i++) {
            await greetingStore.add({
                text: "hello world" + i,
                setter: "0xdeadbeef" + i
            });
        }
    });


    it("should retrieve all greetings", async () => {
        const response = await request(httpServer)
            .get("/greetings")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);

        const greetings = <Greeting[]> response.body.data.greetings;
        expect(greetings.length).toEqual(20);

        for (let i = 0 ; i < 20 ; i++) {
            expect(greetings[i]).toEqual({
                text: "hello world" + i,
                setter: "0xdeadbeef" + i
            });
        }
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}