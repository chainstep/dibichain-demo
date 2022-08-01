import { model, Schema } from "mongoose";
import { ProductDetailsResponse } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { IProductDetailsResponseStore } from "./IProductDetailsResponseStore";


export class ProductDetailsResponseStoreMongoDB extends AMongoDBStore implements IProductDetailsResponseStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("ProductDetailsResponse", new Schema<ProductDetailsResponse>({
                uid: { type: String, required: true },
                publicKey: { type: String, required: true },
                message: {
                    secret: { type: String, required: true },
                    cipherText: { type: String, required: true },
                    initVector: { type: String, required: true }
                },
                timestamp: { type: Number, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(productDetailsResponse: ProductDetailsResponse): Promise<void> {
        await this._upsert(productDetailsResponse, productDetailsResponse);
    }


    public async find(params: {uid?: string, publicKey?: string}): Promise<ProductDetailsResponse[]> {
        return await this._find(params);
    }


    public async delete(params: {uid: string}): Promise<void> {
        return await this._delete(params);
    }
}