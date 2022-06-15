import { MyDocument } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IMyDocumentStore } from "./IMyDocumentStore";


export class MyDocumentStoreInMemory extends AInMemoryStore implements IMyDocumentStore {
    public store: MyDocument[] = [];


    public async upsert(myDocument: MyDocument): Promise<void> {
        this._upsert(myDocument, "uid");
    }


    public async find(params: {uid?: string}): Promise<MyDocument[]> {
        const { uid } = params;
        if (uid) {
            return this._find(["uid"], [uid]);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this._delete("uid", uid);
    }
}