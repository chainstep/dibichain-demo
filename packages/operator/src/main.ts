import { Contract, Wallet } from "ethers";
import { Contracts } from "./contract/Contracts";
import { EventBus } from "./contract/interfaces/EventBus";
import EventBusJSON from "./contract/interfaces/EventBus.json";
import { initHttpServer } from "./http";
import { EnvVars, RUN_CONTEXT } from "./lib/EnvVars";
import { RPCProvider } from "./lib/RPCProvider";
import { ProductDetailsResponseStore } from "./storage/product-details-response/ProductDetailsResponseStore";
import { createProductDetailsResponseStore } from "./storage/product-details-response/productDetailsResponseStoreFactory";
import { StorageType } from "./storage/StorageType";
import { ConsoleTransport, initLogger, logger } from "./utils/logger";


async function main(): Promise<void> {
    initLogger({
        level: EnvVars.RUN_CONTEXT === RUN_CONTEXT.DEVELOPMENT ? "all" : "http",
        transports: [
            new ConsoleTransport()
        ]
    });

    logger.info("Init databases...");
    const storageType = EnvVars.MONGO_DB_URL ? StorageType.MONGO_DB : StorageType.IN_MEMORY;
    ProductDetailsResponseStore.init(createProductDetailsResponseStore(storageType));

    logger.info("Init RPC provider...");
    RPCProvider.init(EnvVars.RPC_URL);

    logger.info("Init contracts...");
    Contracts.init({
        eventBus: <EventBus> new Contract(
            EnvVars.EVENT_BUS_CONTRACT_ADDRESS,
            EventBusJSON.abi,
            new Wallet(
                EnvVars.ETHEREUM_PRIVATE_KEY,
                RPCProvider.provider
            )
        )
    });

    logger.info("Init http server...");
    const server = initHttpServer();

    logger.info("Start server...");
    server.listen(EnvVars.PORT, () => {
        logger.info(`Listening on port ${EnvVars.PORT}...`);
    });
}

main();