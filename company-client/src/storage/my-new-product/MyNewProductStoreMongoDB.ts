import { connect, model, Schema } from "mongoose";
import { MyNewProduct } from "../../types";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { IMyNewProductStore } from "./IMyNewProductStore";


const schema = new Schema<MyNewProduct>({
    uid: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    number: { type: String, required: true },
    hash: { type: String, required: true },
    timestamp: { type: Number, required: true }
});

const MyNewProductModel = model<MyNewProduct>("MyNewProduct", schema);


export class MyNewProductStoreMongoDB implements IMyNewProductStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async upsert(product: MyNewProduct): Promise<void> {
        await connect(this.mongoUrl);
        await MyNewProductModel.updateOne({ uid: product.uid }, product, { upsert: true });
    }


    public async find(params: {uid?: string}): Promise<MyNewProduct[]> {
        const { uid } = params;
        const query = uid ? { uid } : {};

        await connect(this.mongoUrl);
        const doc = await MyNewProductModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        await connect(this.mongoUrl);
        await MyNewProductModel.deleteOne({ uid });
    }
}