import { Document } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IDocumentStore } from "./IDocumentStore";


export class DocumentStoreInMemory extends AInMemoryStore implements IDocumentStore {
    public store: Document[] = [];


    public async upsert(document: Document): Promise<void> {
        this._upsert(document, "uid");
    }


    public async find(params: {uid?: string}): Promise<Document[]> {
        const { uid } = params;
        if (uid) {
            return this._find(["uid"], [uid]);
        }
        return this.store;
    }
}