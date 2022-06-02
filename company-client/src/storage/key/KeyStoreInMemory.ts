import { Key } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IKeyStore } from "./IKeyStore";


export class KeyStoreInMemory extends AInMemoryStore implements IKeyStore {
    public store: Key[] = [];


    public async upsert(key: Key): Promise<void> {
        this._upsert(key, "publicKey");
    }


    public async find(params: {publicKey?: string}): Promise<Key[]> {
        const { publicKey } = params;
        if (publicKey) {
            return this._find("publicKey", publicKey);
        }
        return this.store;
    }
}