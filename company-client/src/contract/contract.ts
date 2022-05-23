import { EnvVars } from "../lib/EnvVars";
import { BlockchainInfoStore } from "../storage/blockchain/BlockchainInfoStore";
import { EventBus } from "./interfaces/EventBus";
import { createContractEventHandler } from "./listeners/contractEventHandlerFactory";
import { catchUpEvents } from "./listeners/eventCatchUpper";
import { createNewProductListener } from "./listeners/newProduct/newProduct";


export async function initContractListeners(contract: EventBus): Promise<void> {
    const newProductListener = createNewProductListener();
    const blockchainInfoStore = BlockchainInfoStore.get();

    if (EnvVars.CATCH_UP_ALL_CONTRACT_EVENTS) {
        await blockchainInfoStore.setBlockHeight(1);
    }

    const blockchainInfo = await blockchainInfoStore.get();
    if (blockchainInfo) {
        await catchUpEvents({
            fromBlockHeight: blockchainInfo.blockHeight,
            contract,
            eventSetups: [{
                eventListener: newProductListener
            }]
        });
    }

    [newProductListener].forEach((eventListener) => {
        createContractEventHandler({
            contract,
            eventListener
        });
    });
}