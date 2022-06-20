import { model, Schema } from "mongoose";
import { MyProductDetailsRequest } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { IMyProductDetailsRequestStore } from "./IMyProductDetailsRequestStore";


export class MyProductDetailsRequestStoreMongoDB extends AMongoDBStore implements IMyProductDetailsRequestStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("MyProductDetailsRequest", new Schema<MyProductDetailsRequest>({
                uid: { type: String, required: true },
                algorithm: { type: String, required: true },
                publicKey: { type: String, required: true },
                timestamp: { type: Number, required: true },
                responded: { type: Boolean, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(myProductDetailsRequest: MyProductDetailsRequest): Promise<void> {
        await this._upsert({ uid: myProductDetailsRequest.uid }, myProductDetailsRequest);
    }


    public async find(params: {uid?: string}): Promise<MyProductDetailsRequest[]> {
        return await this._find(params);
    }


    public async delete(params: {uid: string}): Promise<void> {
        return await this._delete(params);
    }
}