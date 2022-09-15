import { model, Schema } from "mongoose";
import { MyNewProduct } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { DeleteParams, FindParams, IMyNewProductStore } from "./IMyNewProductStore";


export class MyNewProductStoreMongoDB extends AMongoDBStore implements IMyNewProductStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("MyNewProduct", new Schema<MyNewProduct>({
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


    public async find(params: FindParams): Promise<MyNewProduct[]> {
        return await this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        await this._delete(params);
    }
}