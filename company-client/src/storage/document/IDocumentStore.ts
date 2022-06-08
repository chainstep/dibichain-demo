import { Document } from "../../types";


export interface IDocumentStore {
    upsert(document: Document): Promise<void>;
    find(params: {uid?: string}): Promise<Document[]>;
}