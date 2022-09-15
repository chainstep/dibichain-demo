import { model, Schema } from "mongoose";
import { MyDocument } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { DeleteParams, FindParams, IMyDocumentStore } from "./IMyDocumentStore";


export class MyDocumentStoreMongoDB extends AMongoDBStore implements IMyDocumentStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("MyDocument", new Schema<MyDocument>({
                uid: { type: String, required: true },
                name: { type: String, required: true },
                type: { type: String, required: true },
                version: { type: String, required: true },
                data: { type: String, required: true },
                timestamp: { type: Number, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(myDocument: MyDocument): Promise<void> {
        await this._upsert({ uid: myDocument.uid }, myDocument);
    }


    public async find(params: FindParams): Promise<MyDocument[]> {
        return await this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        await this._delete(params);
    }
}