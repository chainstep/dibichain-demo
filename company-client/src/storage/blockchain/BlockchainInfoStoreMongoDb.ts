import { connect, model, Schema } from "mongoose";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { BlockchainInfo, IBlockchainInfoStore } from "./IBlockchainInfoStore";


const schema = new Schema<BlockchainInfo>({
    blockHeight: { type: Number, required: true },
});

const BlockchainInfoModel = model<BlockchainInfo>("BlockchainInfo", schema);


export class BlockchainInfoStoreMongoDb implements IBlockchainInfoStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async setBlockHeight(blockHeight: number): Promise<void> {
        const filter = {};
        const update = {
            blockHeight
        };

        await connect(this.mongoUrl);
        await BlockchainInfoModel.updateOne(filter, update, { upsert: true });
    }


    public async get(): Promise<BlockchainInfo | undefined> {
        const filter = {};

        await connect(this.mongoUrl);
        const doc = await BlockchainInfoModel.findOne(filter, REMOVE_MONGO_FIELDS).lean();
        return doc || undefined;
    }
}