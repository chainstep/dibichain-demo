import { Key } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, FindParams, IKeyStore } from "./IKeyStore";


export class KeyStoreInMemory extends AInMemoryStore implements IKeyStore {
    public store: Key[] = [];


    public async upsert(key: Key): Promise<void> {
        this._upsert({ publicKey: key.publicKey }, key);
    }


    public async find(params: FindParams): Promise<Key[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        this._delete(params);
    }
}