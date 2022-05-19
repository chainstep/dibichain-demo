export type BlockchainInfo = {
    blockHeight: number;
}


export interface IBlockchainInfoStore {
    setBlockHeight(blockHeight: number): Promise<void>;
    get(): Promise<BlockchainInfo | undefined>;
}