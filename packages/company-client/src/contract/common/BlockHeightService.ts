import { Event } from "ethers";
import { IBlockchainInfoStore } from "../../storage/blockchain/IBlockchainInfoStore";
import { logger } from "../../utils/logger";
import { ContractEventService } from "../ContractEventHandler";


interface BlockHeightServiceOptions {
    blockchainInfoStore: IBlockchainInfoStore
}


export class BlockHeightService implements ContractEventService {
    private readonly blockchainInfoStore: IBlockchainInfoStore;


    constructor(options: BlockHeightServiceOptions) {
        this.blockchainInfoStore = options.blockchainInfoStore;
    }


    public async run(inputs: unknown[]): Promise<void> {
        try {
            const event = <Event> inputs[inputs.length - 1];
            this.blockchainInfoStore.upsert({ blockHeight: event.blockNumber });
        } catch (error) {
            logger.error((<Error> error).message);
        }
    }
}