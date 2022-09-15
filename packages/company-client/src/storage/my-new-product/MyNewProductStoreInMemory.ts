import { MyNewProduct, NewProduct } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, FindParams, IMyNewProductStore } from "./IMyNewProductStore";


export class MyNewProductStoreInMemory extends AInMemoryStore implements IMyNewProductStore {
    public store: NewProduct[] = [];


    public async upsert(product: MyNewProduct): Promise<void> {
        this._upsert({ uid: product.uid }, product);
    }


    public async find(params: FindParams): Promise<MyNewProduct[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        this._delete(params);
    }
}