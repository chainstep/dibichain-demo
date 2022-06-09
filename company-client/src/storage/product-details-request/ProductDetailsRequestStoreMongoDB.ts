import { connect, model, Schema } from "mongoose";
import { ProductDetailsRequest } from "../../types";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { IProductDetailsRequestStore } from "./IProductDetailsRequestStore";


const schema = new Schema<ProductDetailsRequest>({
    uid: { type: String, required: true },
    algorithm: { type: String, required: true },
    publicKey: { type: String, required: true },
    timestamp: { type: Number, required: true },
    responded: { type: Boolean, required: true }
});

const ProductDetailsRequestModel = model<ProductDetailsRequest>("ProductDetailsRequest", schema);


export class ProductDetailsRequestStoreMongoDB implements IProductDetailsRequestStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async upsert(productDetailsRequest: ProductDetailsRequest): Promise<void> {
        await connect(this.mongoUrl);
        await ProductDetailsRequestModel.updateOne(
            { uid: productDetailsRequest.uid },
            productDetailsRequest,
            { upsert: true }
        );
    }


    public async find(params: {uid?: string, publicKey: string}): Promise<ProductDetailsRequest[]> {
        const { uid, publicKey } = params;
        const query = uid && publicKey ? { uid, publicKey } : uid ? { uid } : publicKey ? { publicKey } : {};

        await connect(this.mongoUrl);
        const doc = await ProductDetailsRequestModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        await connect(this.mongoUrl);
        await ProductDetailsRequestModel.deleteOne({ uid });
    }
}