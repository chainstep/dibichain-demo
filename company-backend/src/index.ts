import { initHttpServer } from "./http/http";
import { EnvVars, RUN_CONTEXT } from "./lib/EnvVars";
import { ProductStore } from "./storage/product/ProductStore";
import { createProductStore } from "./storage/product/productStoreFactory";
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
    if (isDevContext && !EnvVars.USE_MONGO_DB) {
        ProductStore.init(createProductStore(StorageType.IN_MEMORY));
    } else {
        ProductStore.init(createProductStore(StorageType.MONGO_DB));
    }

    logger.info("Init http server...");
    const server = initHttpServer();

    logger.info("Start server...");
    server.listen(EnvVars.PORT, () => {
        logger.info(`Listening on port ${EnvVars.PORT}...`);
    });
}


main();