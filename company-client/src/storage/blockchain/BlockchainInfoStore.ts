import { IBlockchainInfoStore } from "./IBlockchainInfoStore";


export class BlockchainInfoStore {
    private static store: IBlockchainInfoStore;


    public static init(store: IBlockchainInfoStore): void {
        this.store = store;
    }


    public static get(): IBlockchainInfoStore {
        if (!this.store) {
            throw new Error("BlockchainInfo store not initialized! Call init function first");
        }
        return this.store;
    }
}