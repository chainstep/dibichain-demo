import { model, Schema } from "mongoose";
import { ProductDetailsRequest } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { IProductDetailsRequestStore } from "./IProductDetailsRequestStore";


export class ProductDetailsRequestStoreMongoDB extends AMongoDBStore implements IProductDetailsRequestStore {
    private readonly mongoUrl: string;


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
        this.mongoUrl = options.mongoUrl;
    }


    public async upsert(productDetailsRequest: ProductDetailsRequest): Promise<void> {
        await this._upsert({ uid: productDetailsRequest.uid }, productDetailsRequest);
    }


    public async find(params: {uid?: string, publicKey?: string}): Promise<ProductDetailsRequest[]> {
        return await this._find(params);
    }


    public async delete(params: {uid: string}): Promise<void> {
        return await this._delete(params);
    }
}