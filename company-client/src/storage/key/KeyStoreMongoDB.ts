import { connect, model, Schema } from "mongoose";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { Key } from "../../types";
import { IKeyStore } from "./IKeyStore";


const schema = new Schema<Key>({
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true },
    algorithm: { type: String, required: true }
});

const KeyModel = model<Key>("Key", schema);


export class KeyStoreMongoDB implements IKeyStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async upsert(key: Key): Promise<void> {
        await connect(this.mongoUrl);
        await KeyModel.updateOne({ publicKey: key.publicKey }, key, { upsert: true });
    }


    public async find(params: {publicKey?: string}): Promise<Key[]> {
        const { publicKey } = params;
        const query = publicKey ? { publicKey } : {};

        await connect(this.mongoUrl);
        const doc = await KeyModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }
}