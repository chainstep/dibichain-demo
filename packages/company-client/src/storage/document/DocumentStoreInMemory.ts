import { Document } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, FindParams, IDocumentStore } from "./IDocumentStore";


export class DocumentStoreInMemory extends AInMemoryStore implements IDocumentStore {
    public store: Document[] = [];


    public async upsert(document: Document): Promise<void> {
        this._upsert({ uid: document.uid }, document);
    }


    public async find(params: FindParams): Promise<Document[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        this._delete(params);
    }
}