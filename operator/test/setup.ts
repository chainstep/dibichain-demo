import { GreetingStore } from "../src/storage/greeting/GreetingStore";
import { createGreetingStore } from "../src/storage/greeting/greetingStoreFactory";
import { StorageType } from "../src/storage/StorageType";
import { DummyTransport, initLogger } from "../src/utils/logger";


jest.setTimeout(100 * 1000);

GreetingStore.init(createGreetingStore(StorageType.IN_MEMORY));

initLogger({
    level: "all",
    transports: [
        new DummyTransport(),
        // new ConsoleTransport(),
    ]
});