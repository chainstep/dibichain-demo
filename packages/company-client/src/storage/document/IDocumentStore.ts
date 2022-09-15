import { Document } from "../../types";


export interface FindParams {
    uid?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface IDocumentStore {
    upsert(document: Document): Promise<void>;
    find(params: FindParams): Promise<Document[]>;
    delete(params: DeleteParams): Promise<void>;
}