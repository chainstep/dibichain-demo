import { model, Schema } from "mongoose";
import { Product } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { IProductStore } from "./IProductStore";


export class ProductStoreMongoDB extends AMongoDBStore implements IProductStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model<Product>("Product", new Schema<Product>({
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
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(product: Product): Promise<void> {
        await this._upsert({ uid: product.uid }, product);
    }


    public async find(params: {id?: string, uid?: string, name?: string}): Promise<Product[]> {
        return await this._find(params);
    }


    public async delete(params: { uid: string; }): Promise<void> {
        await this._delete(params);
    }
}