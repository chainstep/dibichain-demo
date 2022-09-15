import { model, Schema } from "mongoose";
import { ProductDetailsRequest } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { DeleteParams, FindParams, IProductDetailsRequestStore } from "./IProductDetailsRequestStore";


export class ProductDetailsRequestStoreMongoDB extends AMongoDBStore implements IProductDetailsRequestStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("ProductDetailsRequest", new Schema<ProductDetailsRequest>({
                uid: { type: String, required: true },
                algorithm: { type: String, required: true },
                publicKey: { type: String, required: true },
                timestamp: { type: Number, required: true },
                responded: { type: Boolean, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(productDetailsRequest: ProductDetailsRequest): Promise<void> {
        await this._upsert({ uid: productDetailsRequest.uid }, productDetailsRequest);
    }


    public async find(params: FindParams): Promise<ProductDetailsRequest[]> {
        return await this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        return await this._delete(params);
    }
}