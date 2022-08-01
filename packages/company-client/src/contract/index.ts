import { EnvVars } from "../lib/EnvVars";
import { BlockchainInfoStore } from "../storage/blockchain/BlockchainInfoStore";
import { EventBus } from "./interfaces/EventBus";
import { ContractEventHandler } from "./ContractEventHandler";
import { catchUpEvents } from "./eventCatchUpper";
import { createNewProductListener } from "./listeners/new-product/newProduct";
import { createProductDetailsRequestListener } from "./listeners/product-details-request/productDetailsRequest";


export async function initContractListeners(contract: EventBus): Promise<void> {
    const eventListeners = [
        createNewProductListener(),
        createProductDetailsRequestListener()
    ];
    const blockchainInfoStore = BlockchainInfoStore.get();

    if (EnvVars.CATCH_UP_ALL_CONTRACT_EVENTS) {
        await blockchainInfoStore.upsert({ blockHeight: 1 });
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

    const eventHandler = new ContractEventHandler({ contract });
    await eventHandler.init();

    eventListeners.forEach((eventListener) => {
        eventHandler.add(eventListener);
    });
}