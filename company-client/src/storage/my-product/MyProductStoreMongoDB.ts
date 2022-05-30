import { connect, model, Schema } from "mongoose";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { MyProduct } from "../../types";
import { IMyProductStore } from "./IMyProductStore";


const schema = new Schema<MyProduct>({
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

const MyProductModel = model<MyProduct>("MyProduct", schema);


export class MyProductStoreMongoDB implements IMyProductStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async add(myProduct: MyProduct): Promise<void> {
        await connect(this.mongoUrl);
        await MyProductModel.updateOne({ uid: myProduct.uid }, myProduct, { upsert: true });
    }


    public async find(params: {id?: string, uid?: string, name?: string}): Promise<MyProduct[]> {
        const { id, uid, name } = params;
        const query = uid ? { uid } : id ? { id } : name ? { name } : {};

        await connect(this.mongoUrl);
        const doc = await MyProductModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }
}