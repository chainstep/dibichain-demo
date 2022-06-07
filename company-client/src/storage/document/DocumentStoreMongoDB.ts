import { connect, model, Schema } from "mongoose";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { Document } from "../../types";
import { IDocumentStore } from "./IDocumentStore";


const schema = new Schema<Document>({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    version: { type: String, required: true },
    data: { type: String, required: true },
    uploaded: { type: Number, required: true }
});

const DocumentModel = model<Document>("Document", schema);


export class DocumentStoreMongoDB implements IDocumentStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async upsert(document: Document): Promise<void> {
        await connect(this.mongoUrl);
        await DocumentModel.updateOne({ uid: document.uid }, document, { upsert: true });
    }


    public async find(params: {uid?: string}): Promise<Document[]> {
        const { uid } = params;
        const query = uid ? { uid } : {};

        await connect(this.mongoUrl);
        const doc = await DocumentModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }
}