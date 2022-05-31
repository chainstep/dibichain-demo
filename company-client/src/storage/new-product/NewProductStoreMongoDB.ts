import { connect, model, Schema } from "mongoose";
import { NewProduct } from "../../types";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { INewProductStore } from "./INewProductStore";


const schema = new Schema<NewProduct>({
    uid: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    number: { type: String, required: true },
    hash: { type: String, required: true },
    timestamp: { type: Number, required: true }
});

const NewProductModel = model<NewProduct>("NewProduct", schema);


export class NewProductStoreMongoDB implements INewProductStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async upsert(product: NewProduct): Promise<void> {
        await connect(this.mongoUrl);
        await NewProductModel.updateOne({ uid: product.uid }, product, { upsert: true });
    }


    public async find(params: {uid?: string}): Promise<NewProduct[]> {
        const { uid } = params;
        const query = uid ? { uid } : {};

        await connect(this.mongoUrl);
        const doc = await NewProductModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        await connect(this.mongoUrl);
        await NewProductModel.deleteOne({ uid });
    }
}