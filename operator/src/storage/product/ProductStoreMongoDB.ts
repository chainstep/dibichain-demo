// import { connect, model, Schema } from "mongoose";
// import { REMOVE_MONGO_FIELDS } from "../constants";
import { Product } from "../../types";
import { IProductStore } from "./IProductStore";


// const schema = new Schema<Product>({
//     text: { type: String, required: true },
//     setter: { type: String, required: true }
// });

// const ProductModel = model<Product>("Product", schema);


export class ProductStoreMongoDB implements IProductStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async add(product: Product): Promise<void> {
        // const { text, setter } = product;

        // const filter = {
        //     setter
        // };
        // const update = {
        //     text,
        //     setter
        // };

        // await connect(this.mongoUrl);
        // await ProductModel.updateOne(filter, update, { upsert: true });
    }


    public async find(params: {id?: string, uid?: string, name?: string}): Promise<Product[]> {
        // await connect(this.mongoUrl);
        // const doc = await ProductModel.find(setter ? { setter } : {}, REMOVE_MONGO_FIELDS).lean();
        // return doc;
        return [];
    }
}