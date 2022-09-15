import { Key } from "../../types";


export interface FindParams {
    publicKey?: string;
}

export interface DeleteParams {
    publicKey: string;
}

export interface IKeyStore {
    upsert(key: Key): Promise<void>;
    find(params: FindParams): Promise<Key[]>;
    delete(params: DeleteParams): Promise<void>;
}