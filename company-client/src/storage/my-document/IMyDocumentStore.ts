import { MyDocument } from "../../types";


export interface IMyDocumentStore {
    upsert(myDocument: MyDocument): Promise<void>;
    find(params: {uid?: string}): Promise<MyDocument[]>;
}