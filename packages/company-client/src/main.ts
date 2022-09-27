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
import { DocumentStore } from "./storage/document/DocumentStore";
import { createDocumentStore } from "./storage/document/documentStoreFactory";
import { KeyStore } from "./storage/key/KeyStore";
import { createKeyStore } from "./storage/key/KeyStoreFactory";
import { MyDocumentStore } from "./storage/my-document/MyDocumentStore";
import { createMyDocumentStore } from "./storage/my-document/myDocumentStoreFactory";
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
    initLogger({
        level: EnvVars.RUN_CONTEXT === RUN_CONTEXT.DEVELOPMENT ? "all" : "http",
        transports: [
            new ConsoleTransport()
        ]
    });

    logger.info("Init databases...");
    const storageType = EnvVars.MONGO_DB_URL ? StorageType.MONGO_DB : StorageType.IN_MEMORY;
    BlockchainInfoStore.init(createBlockchainInfoStore(storageType));
    ProductStore.init(createProductStore(storageType));
    MyProductStore.init(createMyProductStore(storageType));
    NewProductStore.init(createNewProductStore(storageType));
    MyNewProductStore.init(createMyNewProductStore(storageType));
    MyProductDetailsRequestStore.init(createMyProductDetailsRequestStore(storageType));
    ProductDetailsRequestStore.init(createProductDetailsRequestStore(storageType));
    KeyStore.init(createKeyStore(storageType));
    MyDocumentStore.init(createMyDocumentStore(storageType));
    DocumentStore.init(createDocumentStore(storageType));

    logger.info("Init RPC provider...");
    RPCProvider.setWSConfig({
        connectionCheckIntervalSec: EnvVars.WS_RPC_CONNECTION_CHECK_INTERVAL_SEC,
        connectionCheckTimeoutSec: EnvVars.WS_RPC_CONNECTION_CHECK_TIMEOUT_SEC,
        keepAliveIntervalSec: EnvVars.WS_RPC_KEEP_ALIVE_INTERVAL_SEC,
        reconnectDelaySec: EnvVars.WS_RPC_RECONNECT_DELAY_SEC
    });
    RPCProvider.init(EnvVars.RPC_URL, async (provider: Provider) => {
        logger.info("Reinit contract...");
        initContracts(provider);

        logger.info("Reinit contract listeners...");
        await initContractListeners(Contracts.getEventBus());
        logger.info("Listeners reinitialized");
    });

    logger.info("Init contracts...");
    initContracts(RPCProvider.provider);

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
    logger.info("Done.");
}

function initContracts(provider: Provider): void {
    Contracts.init({
        eventBus: <EventBus> new Contract(
            EnvVars.EVENT_BUS_CONTRACT_ADDRESS,
            EventBusJSON.abi,
            provider
        )
    });
}


main();