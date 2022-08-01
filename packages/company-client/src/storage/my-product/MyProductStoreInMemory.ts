import { MyProduct } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IMyProductStore } from "./IMyProductStore";


export class MyProductStoreInMemory extends AInMemoryStore implements IMyProductStore {
    public store: MyProduct[] = [];


    public async upsert(myProduct: MyProduct): Promise<void> {
        this._upsert({ uid: myProduct.uid }, myProduct);
    }


    public async find(params: {id?: string, uid?: string, name?: string}): Promise<MyProduct[]> {
        return this._find(params);
    }


    public async delete(params: { uid: string; }): Promise<void> {
        this._delete(params);
    }
}