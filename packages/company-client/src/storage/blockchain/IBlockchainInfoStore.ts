import { BlockchainInfo } from "../../types";


export interface IBlockchainInfoStore {
    upsert(blockchainInfo: BlockchainInfo): Promise<void>;
    get(): Promise<BlockchainInfo | undefined>;
}