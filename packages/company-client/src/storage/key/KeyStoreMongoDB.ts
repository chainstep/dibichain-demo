import { model, Schema } from "mongoose";
import { Key } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { DeleteParams, FindParams, IKeyStore } from "./IKeyStore";


export class KeyStoreMongoDB extends AMongoDBStore implements IKeyStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("Key", new Schema<Key>({
                publicKey: { type: String, required: true },
                privateKey: { type: String, required: true },
                algorithm: { type: String, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(key: Key): Promise<void> {
        await this._upsert({ publicKey: key.publicKey }, key);
    }


    public async find(params: FindParams): Promise<Key[]> {
        return await this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        await this._delete(params);
    }
}