import { Provider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { initContractListeners } from "./contract";
import { Contracts } from "./contract/Contracts";
import { EventBus } from "./contract/interfaces/EventBus";
import EventBusJSON from "./contract/interfaces/EventBus.json";
import { initHttpServer } from "./http";
import { initIntervals } from "./interval";
import { EnvVars, RUN_CONTEXT } from "./lib/EnvVars";
import { RPCProvider } from "./lib/RPCProvider";
import { BlockchainInfoStore } from "./storage/blockchain/BlockchainInfoStore";
import { createBlockchainInfoStore } from "./storage/blockchain/blockchainInfoStoreFactory";
import { KeyStore } from "./storage/key/KeyStore";
import { createKeyStore } from "./storage/key/KeyStoreFactory";
import { MyNewProductStore } from "./storage/my-new-product/MyNewProductStore";
import { createMyNewProductStore } from "./storage/my-new-product/myNewProductStoreFactory";
import { MyProductDetailsRequestStore } from "./storage/my-product-details-request/MyProductDetailsRequestStore";
import { createMyProductDetailsRequestStore } from "./storage/my-product-details-request/myProductDetailsRequestStoreFactory";
import { MyProductStore } from "./storage/my-product/MyProductStore";
import { createMyProductStore } from "./storage/my-product/myProductStoreFactory";
import { NewProductStore } from "./storage/new-product/NewProductStore";
import { createNewProductStore } from "./storage/new-product/newProductStoreFactory";
import { ProductDetailsRequestStore } from "./storage/product-details-request/ProductDetailsRequestStore";
import { createProductDetailsRequestStore } from "./storage/product-details-request/productDetailsRequestStoreFactory";
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
        BlockchainInfoStore.init(createBlockchainInfoStore(StorageType.IN_MEMORY));
        ProductStore.init(createProductStore(StorageType.IN_MEMORY));
        MyProductStore.init(createMyProductStore(StorageType.IN_MEMORY));
        NewProductStore.init(createNewProductStore(StorageType.IN_MEMORY));
        MyNewProductStore.init(createMyNewProductStore(StorageType.IN_MEMORY));
        MyProductDetailsRequestStore.init(createMyProductDetailsRequestStore(StorageType.IN_MEMORY));
        ProductDetailsRequestStore.init(createProductDetailsRequestStore(StorageType.IN_MEMORY));
        KeyStore.init(createKeyStore(StorageType.IN_MEMORY));
    } else {
        BlockchainInfoStore.init(createBlockchainInfoStore(StorageType.MONGO_DB));
        ProductStore.init(createProductStore(StorageType.MONGO_DB));
        MyProductStore.init(createMyProductStore(StorageType.MONGO_DB));
        NewProductStore.init(createNewProductStore(StorageType.MONGO_DB));
        MyNewProductStore.init(createMyNewProductStore(StorageType.MONGO_DB));
        MyProductDetailsRequestStore.init(createMyProductDetailsRequestStore(StorageType.MONGO_DB));
        ProductDetailsRequestStore.init(createProductDetailsRequestStore(StorageType.MONGO_DB));
        KeyStore.init(createKeyStore(StorageType.MONGO_DB));
    }

    logger.info("Init RPC provider...");
    RPCProvider.setWSConfig({
        connectionCheckIntervalSec: EnvVars.WS_RPC_CONNECTION_CHECK_INTERVAL_SEC,
        connectionCheckTimeoutSec: EnvVars.WS_RPC_CONNECTION_CHECK_TIMEOUT_SEC,
        keepAliveIntervalSec: EnvVars.WS_RPC_KEEP_ALIVE_INTERVAL_SEC,
        reconnectDelaySec: EnvVars.WS_RPC_RECONNECT_DELAY_SEC
    });
    RPCProvider.init(EnvVars.RPC_URL, async (provider: Provider) => {
        logger.info("Reinit contract...");
        Contracts.init({
            eventBus: <EventBus> new Contract(
                EnvVars.EVENT_BUS_CONTRACT_ADDRESS,
                EventBusJSON.abi,
                provider
            )
        });
        logger.info("Reinit contract listeners...");
        await initContractListeners(Contracts.getEventBus());
        logger.info("Listeners reinitialized");
    });

    logger.info("Init contracts...");
    Contracts.init({
        eventBus: <EventBus> new Contract(
            EnvVars.EVENT_BUS_CONTRACT_ADDRESS,
            EventBusJSON.abi,
            RPCProvider.provider
        )
    });

    logger.info("Init http server...");
    const server = initHttpServer();

    logger.info("Start server...");
    server.listen(EnvVars.PORT, () => {
        logger.info(`Listening on port ${EnvVars.PORT}...`);
    });

    logger.info("Init contract listeners...");
    await initContractListeners(Contracts.getEventBus());
    logger.info("Listeners initialized");

    logger.info("Init intervals...");
    initIntervals();
    logger.info("Intervals initialized");
}


main();
