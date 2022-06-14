import { connect, model, Schema } from "mongoose";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { MyDocument } from "../../types";
import { IMyDocumentStore } from "./IMyDocumentStore";


const schema = new Schema<MyDocument>({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    version: { type: String, required: true },
    data: { type: String, required: true },
    timestamp: { type: Number, required: true }
});

const MyDocumentModel = model<MyDocument>("MyDocument", schema);


export class MyDocumentStoreMongoDB implements IMyDocumentStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async upsert(myDocument: MyDocument): Promise<void> {
        await connect(this.mongoUrl);
        await MyDocumentModel.updateOne({ uid: myDocument.uid }, myDocument, { upsert: true });
    }


    public async find(params: {uid?: string}): Promise<MyDocument[]> {
        const { uid } = params;
        const query = uid ? { uid } : {};

        await connect(this.mongoUrl);
        const doc = await MyDocumentModel.find(query, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }
}