import { model, Schema } from "mongoose";
import { NewProduct } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { INewProductStore } from "./INewProductStore";


export class NewProductStoreMongoDB extends AMongoDBStore implements INewProductStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model<NewProduct>("NewProduct", new Schema<NewProduct>({
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


    public async upsert(newProduct: NewProduct): Promise<void> {
        await this._upsert({ uid: newProduct.uid }, newProduct);
    }


    public async find(params: {uid?: string}): Promise<NewProduct[]> {
        return await this._find(params);
    }


    public async delete(params: {uid: string}): Promise<void> {
        return await this._delete(params);
    }
}