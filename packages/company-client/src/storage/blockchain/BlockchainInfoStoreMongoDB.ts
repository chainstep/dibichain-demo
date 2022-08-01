import { model, Schema } from "mongoose";
import { BlockchainInfo } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { IBlockchainInfoStore } from "./IBlockchainInfoStore";


export class BlockchainInfoStoreMongoDB extends AMongoDBStore implements IBlockchainInfoStore {
    public static readonly ID = "currentState";


    constructor(options: { mongoUrl: string }) {
        super({
            model: model("BlockchainInfo", new Schema<BlockchainInfo>({
                id: { type: String, required: true },
                blockHeight: { type: Number, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(blockchainInfo: BlockchainInfo): Promise<void> {
        blockchainInfo.id = BlockchainInfoStoreMongoDB.ID;
        await super.upsert({ id: blockchainInfo.id }, blockchainInfo);
    }


    public async get(): Promise<BlockchainInfo | undefined> {
        return (await this.find<BlockchainInfo>({}))[0];
    }
}