import { BlockchainInfo, IBlockchainInfoStore } from "./IBlockchainInfoStore";


export class BlockchainInfoStoreInMemory implements IBlockchainInfoStore {
    public blockchainInfo: BlockchainInfo | undefined;


    public async setBlockHeight(blockHeight: number): Promise<void> {
        if (!this.blockchainInfo) {
            this.blockchainInfo = this.initBlockchainInfo();
        }
        this.blockchainInfo.blockHeight = blockHeight;
    }

    private initBlockchainInfo(): BlockchainInfo {
        return {
            blockHeight: 0
        };
    }


    public async get(): Promise<BlockchainInfo | undefined> {
        return this.blockchainInfo;
    }


    public clear(): void {
        this.blockchainInfo = undefined;
    }
}