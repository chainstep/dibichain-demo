import { Key } from "../../types";


export interface IKeyStore {
    upsert(key: Key): Promise<void>;
    find(params: {publicKey?: string}): Promise<Key[]>;
    delete(params: {publicKey: string}): Promise<void>;
}