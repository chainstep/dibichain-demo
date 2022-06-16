import { MyNewProduct, NewProduct } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IMyNewProductStore } from "./IMyNewProductStore";


export class MyNewProductStoreInMemory extends AInMemoryStore implements IMyNewProductStore {
    public store: NewProduct[] = [];


    public async upsert(myNewProduct: MyNewProduct): Promise<void> {
        this._upsert(myNewProduct, "uid");
    }


    public async find(params: {uid?: string}): Promise<MyNewProduct[]> {
        const { uid } = params;
        if (uid) {
            return this._find(["uid"], [uid]);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this._delete("uid", uid);
    }
}