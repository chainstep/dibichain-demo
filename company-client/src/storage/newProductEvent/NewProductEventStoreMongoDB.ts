import { connect, model, Schema } from "mongoose";
import { NewProductEvent } from "../../types";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { INewProductEventStore } from "./INewProductEventStore";


const schema = new Schema<NewProductEvent>({
    uid: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    number: { type: String, required: true },
    hash: { type: String, required: true },
    timestamp: { type: Number, required: true }
});

const NewProductEventModel = model<NewProductEvent>("NewProductEvent", schema);


export class NewProductEventStoreMongoDB implements INewProductEventStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async add(product: NewProductEvent): Promise<void> {
        await connect(this.mongoUrl);
        await NewProductEventModel.updateOne({ uid: product.uid }, product, { upsert: true });
    }


    public async find(params: {uid?: string}): Promise<NewProductEvent[]> {
        const { uid } = params;
        const query = uid ? { uid } : {};

        await connect(this.mongoUrl);
        const doc = await NewProductEventModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        await connect(this.mongoUrl);
        await NewProductEventModel.deleteOne({ uid });
    }
}