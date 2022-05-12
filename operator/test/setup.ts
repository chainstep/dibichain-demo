import { DummyTransport, initLogger } from "../src/utils/logger";


jest.setTimeout(100 * 1000);


initLogger({
    level: "all",
    transports: [
        new DummyTransport(),
        // new ConsoleTransport(),
    ]
});