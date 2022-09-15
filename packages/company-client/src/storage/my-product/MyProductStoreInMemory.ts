import { MyProduct } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, FindParams, IMyProductStore } from "./IMyProductStore";


export class MyProductStoreInMemory extends AInMemoryStore implements IMyProductStore {
    public store: MyProduct[] = [];


    public async upsert(myProduct: MyProduct): Promise<void> {
        this._upsert({ uid: myProduct.uid }, myProduct);
    }


    public async find(params: FindParams): Promise<MyProduct[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        this._delete(params);
    }
}