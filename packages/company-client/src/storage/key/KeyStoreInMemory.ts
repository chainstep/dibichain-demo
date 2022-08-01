import { Key } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IKeyStore } from "./IKeyStore";


export class KeyStoreInMemory extends AInMemoryStore implements IKeyStore {
    public store: Key[] = [];


    public async upsert(key: Key): Promise<void> {
        this._upsert({ publicKey: key.publicKey }, key);
    }


    public async find(params: {publicKey?: string}): Promise<Key[]> {
        return this._find(params);
    }


    public async delete(params: {publicKey: string}): Promise<void> {
        this._delete(params);
    }
}