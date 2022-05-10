import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { initContractListeners } from "./contract/contract";
import { Greeter } from "./contract/interfaces/Greeter";
import GreeterJSON from "./contract/interfaces/Greeter.json";
import { initHttpServer } from "./http/httpServer";
import { EnvVars, RUN_CONTEXT } from "./lib/EnvVars";
import { GreetingStore } from "./storage/greeting/GreetingStore";
import { createGreetingStore } from "./storage/greeting/greetingStoreFactory";
import { StorageType } from "./storage/StorageType";
import { ConsoleTransport, initLogger, logger } from "./utils/logger";


async function main(): Promise<void> {
    const isDevContext = EnvVars.RUN_CONTEXT === RUN_CONTEXT.DEVELOPMENT;

    initLogger({
        level: isDevContext ? "all" : "http",
        transports: [
            new ConsoleTransport()
        ]
    });

    logger.info("Init databases...");
    if (isDevContext) {
        GreetingStore.init(createGreetingStore(StorageType.IN_MEMORY));
    } else {
        GreetingStore.init(createGreetingStore(StorageType.MONGO_DB));
    }

    logger.info("Init http server...");
    const server = initHttpServer();

    logger.info("Start server...");
    server.listen(EnvVars.PORT, () => {
        logger.info(`Listening on port ${EnvVars.PORT}...`);
    });

    logger.info("Init contract listeners...");
    initContractListeners(<Greeter> new Contract(
        EnvVars.GREETER_CONTRACT_ADDRESS,
        GreeterJSON.abi,
        new StaticJsonRpcProvider(EnvVars.RPC_URL)
    ));
    logger.info("Listeners initialized");
}


main();