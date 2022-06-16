import { model, Schema } from "mongoose";
import { MyNewProduct } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { IMyNewProductStore } from "./IMyNewProductStore";


export class MyNewProductStoreMongoDB extends AMongoDBStore implements IMyNewProductStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model<MyNewProduct>("MyNewProduct", new Schema<MyNewProduct>({
                uid: { type: String, required: true },
                id: { type: String, required: true },
                name: { type: String, required: true },
                type: { type: String, required: true },
                number: { type: String, required: true },
                hash: { type: String, required: true },
                timestamp: { type: Number, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(product: MyNewProduct): Promise<void> {
        await this._upsert({ uid: product.uid }, product);
    }


    public async find(params: {uid?: string}): Promise<MyNewProduct[]> {
        return await this._find(params);
    }


    public async delete(params: { uid: string; }): Promise<void> {
        await this._delete(params);
    }
}