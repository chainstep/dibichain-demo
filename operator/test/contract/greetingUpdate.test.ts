import { initContractListeners } from "../../src/contract/contract";
import { Greeter } from "../../src/contract/interfaces/Greeter";
import { GreetingStore } from "../../src/storage/greeting/GreetingStore";
import { GreetingStoreInMemory } from "../../src/storage/greeting/GreetingStoreInMemory";
import { config } from "../config";


// mock Greeter contract
type EventListener = (...args: unknown[]) => Promise<void>;

let greetingUpdateListener = <EventListener> {};
const mockContract = <unknown> {
    on: (event: string, listener: EventListener): void => {
        if (event === "GreetingUpdate") {
            greetingUpdateListener = listener;
        }
    }
};


if (!config.skipTests.includes("greetingUpdate")) {
    const greetingStore = GreetingStore.get();

    beforeEach(async () => {
        (<GreetingStoreInMemory> greetingStore).clear();
    });


    it("should successfully store the greeting text in a greeting update event", async () => {
        initContractListeners(<Greeter> mockContract);
        await greetingUpdateListener("0xdeadbeef", "hello World :)", { blockNumber: 10 });

        const storedGreeting = (<GreetingStoreInMemory> greetingStore).store[0];
        expect(storedGreeting.text).toEqual("hello World :)");
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}