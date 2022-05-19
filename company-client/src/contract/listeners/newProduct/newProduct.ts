import { BigNumber, Event } from "ethers";
import { BlockchainInfoStore } from "../../../storage/blockchain/BlockchainInfoStore";
import { NewProductEventStore } from "../../../storage/newProductEvent/NewProductEventStore";
import { ContractEventListener } from "../contractEventHandlerFactory";
import { NewProductService } from "./NewProductService";


export function createNewProductListener(): ContractEventListener {
    return {
        eventName: "NewProduct",
        middlewares: [trackNewProductEvent],
        service: new NewProductService()
    };
}

async function trackNewProductEvent(args: unknown[]): Promise<void> {
    const blockchainInfoStore = BlockchainInfoStore.get();
    const newProductEventStore = NewProductEventStore.get();
    console.log("EVENT");
    // console.log(args);
    // const from = <string> args[0];
    // const to = <string> args[1];
    // const tokenId = (<BigNumber> args[2]).toNumber();
    // const event = <Event> args[3];

    // if (from !== ZERO_ADDRESS) {
    //     return;
    // }

    // await blockchainInfoStore.setBlockHeight(event.blockNumber);
    // const block = await event.getBlock();
    // await tokenEventStore.add({
    //     type: "mint",
    //     blockNumber: event.blockNumber,
    //     timestamp: block.timestamp,
    //     tokenId,
    //     owner: to
    // });
}