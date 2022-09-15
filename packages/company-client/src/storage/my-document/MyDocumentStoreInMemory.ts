import { MyDocument } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, FindParams, IMyDocumentStore } from "./IMyDocumentStore";


export class MyDocumentStoreInMemory extends AInMemoryStore implements IMyDocumentStore {
    public store: MyDocument[] = [];


    public async upsert(myDocument: MyDocument): Promise<void> {
        this._upsert({ uid: myDocument.uid }, myDocument);
    }


    public async find(params: FindParams): Promise<MyDocument[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        this._delete(params);
    }
}