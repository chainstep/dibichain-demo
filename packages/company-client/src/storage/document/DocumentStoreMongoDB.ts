import { model, Schema } from "mongoose";
import { Document } from "../../types";
import { AMongoDBStore } from "../AMongoDBStore";
import { DeleteParams, FindParams, IDocumentStore } from "./IDocumentStore";


export class DocumentStoreMongoDB extends AMongoDBStore implements IDocumentStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("Document", new Schema<Document>({
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


    public async upsert(document: Document): Promise<void> {
        await this._upsert({ uid: document.uid }, document);
    }


    public async find(params: FindParams): Promise<Document[]> {
        return await this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        await this._delete(params);
    }
}