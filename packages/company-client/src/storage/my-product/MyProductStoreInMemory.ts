import { MyProduct } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IMyProductStore } from "./IMyProductStore";


export class MyProductStoreInMemory extends AInMemoryStore implements IMyProductStore {
    public store: MyProduct[] = [];


    public async upsert(myProduct: MyProduct): Promise<void> {
        this._upsert(myProduct, "uid");
    }


    public async find(params: {id?: string, uid?: string, name?: string}): Promise<MyProduct[]> {
        const { id, uid, name } = params;
        if (uid) {
            return this._find(["uid"], [uid]);
        }
        if (id) {
            return this._find(["id"], [id]);
        }
        if (name) {
            return this._find(["name"], [name]);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this._delete("uid", uid);
    }
}