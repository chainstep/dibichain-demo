import { BlockchainInfo } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IBlockchainInfoStore } from "./IBlockchainInfoStore";


export class BlockchainInfoStoreInMemory extends AInMemoryStore implements IBlockchainInfoStore {
    public static readonly ID = "blockchainInfo";
    public store: BlockchainInfo[] = [];


    public async upsert(blockchainInfo: BlockchainInfo): Promise<void> {
        blockchainInfo.id = BlockchainInfoStoreInMemory.ID;
        this._upsert({ id: blockchainInfo.id }, blockchainInfo);
    }


    public async get(): Promise<BlockchainInfo | undefined> {
        return this.store[0];
    }
}