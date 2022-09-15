import { model, Schema } from "mongoose";
import { MyProduct } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { DeleteParams, FindParams, IMyProductStore } from "./IMyProductStore";


export class MyProductStoreMongoDB extends AMongoDBStore implements IMyProductStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("MyProduct", new Schema<MyProduct>({
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


    public async upsert(myProduct: MyProduct): Promise<void> {
        await this._upsert({ uid: myProduct.uid }, myProduct);
    }


    public async find(params: FindParams): Promise<MyProduct[]> {
        return await this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        await this._delete(params);
    }
}