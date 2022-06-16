import { connect, model, Schema } from "mongoose";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { IProductDetailsResponseStore, ProductDetailsResponse } from "./IProductDetailsResponseStore";


const schema = new Schema<ProductDetailsResponse>({
    uid: { type: String, required: true },
    publicKey: { type: String, required: true },
    message: {
        secret: { type: String, required: true },
        cipherText: { type: String, required: true },
        initVector: { type: String, required: true }
    },
    timestamp: { type: Number, required: true }
});

const ProductDetailsResponseModel = model<ProductDetailsResponse>("ProductDetailsResponse", schema);


export class ProductDetailsResponseStoreMongoDB implements IProductDetailsResponseStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async upsert(productDetailsResponse: ProductDetailsResponse): Promise<void> {
        const filter = productDetailsResponse;
        const update = productDetailsResponse;

        await connect(this.mongoUrl);
        await ProductDetailsResponseModel.updateOne(filter, update, { upsert: true });
    }


    public async find(params: {uid?: string, publicKey?: string}): Promise<ProductDetailsResponse[]> {
        const filter = params;

        await connect(this.mongoUrl);
        const doc = await ProductDetailsResponseModel.find(filter, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const filter = params;

        await connect(this.mongoUrl);
        await ProductDetailsResponseModel.deleteOne(filter);
    }
}