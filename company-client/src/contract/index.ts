import { EnvVars } from "../lib/EnvVars";
import { BlockchainInfoStore } from "../storage/blockchain/BlockchainInfoStore";
import { EventBus } from "./interfaces/EventBus";
import { createContractEventHandler } from "./listeners/contractEventHandlerFactory";
import { catchUpEvents } from "./listeners/eventCatchUpper";
import { createNewProductListener } from "./listeners/newProduct/newProduct";
import { createProductDetailsRequestListener } from "./listeners/productDetailsRequest/productDetailsRequest";


export async function initContractListeners(contract: EventBus): Promise<void> {
    const eventListeners = [
        createNewProductListener(),
        createProductDetailsRequestListener()
    ];
    const blockchainInfoStore = BlockchainInfoStore.get();

    if (EnvVars.CATCH_UP_ALL_CONTRACT_EVENTS) {
        await blockchainInfoStore.setBlockHeight(1);
    }

    const blockchainInfo = await blockchainInfoStore.get();
    if (blockchainInfo) {
        await catchUpEvents({
            fromBlockHeight: blockchainInfo.blockHeight,
            contract,
            eventSetups: eventListeners.map((listener) => {
                return { eventListener: listener };
            })
        });
    }

    eventListeners.forEach((eventListener) => {
        createContractEventHandler({
            contract,
            eventListener
        });
    });
}