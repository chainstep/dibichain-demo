import { Event } from "ethers";
import { IBlockchainInfoStore } from "../../storage/blockchain/IBlockchainInfoStore";
import { logger } from "../../utils/logger";
import { ContractEventService } from "../ContractEventHandler";


interface Options {
    blockchainInfoStore: IBlockchainInfoStore
}


export class BlockHeightService implements ContractEventService {
    constructor(private readonly options: Options) {}


    public async run(inputs: unknown[]): Promise<void> {
        try {
            const event = <Event> inputs[inputs.length - 1];
            this.options.blockchainInfoStore.upsert({ blockHeight: event.blockNumber });
        } catch (error) {
            logger.error((<Error> error).message);
        }
    }
}