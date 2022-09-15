import { MyDocument } from "../../types";


export interface FindParams {
    uid?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface IMyDocumentStore {
    upsert(myDocument: MyDocument): Promise<void>;
    find(params: FindParams): Promise<MyDocument[]>;
    delete(params: DeleteParams): Promise<void>;
}