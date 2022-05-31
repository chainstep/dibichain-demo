import { connect, model, Schema } from "mongoose";
import { MyProductDetailsRequest } from "../../types";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { IMyProductDetailsRequestStore } from "./IMyProductDetailsRequestStore";


const schema = new Schema<MyProductDetailsRequest>({
    uid: { type: String, required: true },
    algorithm: { type: String, required: true },
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
    timestamp: { type: Number, required: true }
});

const MyProductDetailsRequestModel = model<MyProductDetailsRequest>("MyProductDetailsRequest", schema);


export class MyProductDetailsRequestStoreMongoDB implements IMyProductDetailsRequestStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async add(myProductDetailsRequest: MyProductDetailsRequest): Promise<void> {
        await connect(this.mongoUrl);
        await MyProductDetailsRequestModel.updateOne(
            { uid: myProductDetailsRequest.uid },
            myProductDetailsRequest,
            { upsert: true }
        );
    }


    public async find(params: {uid?: string}): Promise<MyProductDetailsRequest[]> {
        const { uid } = params;
        const query = uid ? { uid } : {};

        await connect(this.mongoUrl);
        const doc = await MyProductDetailsRequestModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        await connect(this.mongoUrl);
        await MyProductDetailsRequestModel.deleteOne({ uid });
    }
}