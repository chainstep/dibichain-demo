import { Document } from "../../types";


export interface IDocumentStore {
    upsert(document: Document): Promise<void>;
    find(params: {uid?: string}): Promise<Document[]>;
    delete(params: {uid: string}): Promise<void>;
}