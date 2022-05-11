import { connect, model, Schema } from "mongoose";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { Product } from "../../types";
import { IProductStore } from "./IProductStore";


const schema = new Schema<Product>({
    id: { type: String, required: true },
    uid: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    number: { type: String, required: true },
    documents: { type: [String], required: false },
    amount: { type: Number, required: false },
    amountUnit: { type: String, required: false },
    weight: { type: Number, required: false },
    weightUnit: { type: String, required: false },
    carbonFootprint: { type: Number, required: false },
    carbonFootprintUnit: { type: String, required: false }
});

const ProductModel = model<Product>("Product", schema);


export class ProductStoreMongoDB implements IProductStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async add(product: Product): Promise<void> {
        await connect(this.mongoUrl);
        await ProductModel.updateOne({ uid: product.uid }, product, { upsert: true });
    }


    public async find(params: {id?: string, uid?: string, name?: string}): Promise<Product[]> {
        const { id, uid, name } = params;
        const query = uid ? { uid } : id ? { id } : name ? { name } : {};

        await connect(this.mongoUrl);
        const doc = await ProductModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }
}