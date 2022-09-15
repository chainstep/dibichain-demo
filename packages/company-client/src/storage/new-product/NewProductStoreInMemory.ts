import { NewProduct } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, FindParams, INewProductStore } from "./INewProductStore";


export class NewProductStoreInMemory extends AInMemoryStore implements INewProductStore {
    public store: NewProduct[] = [];


    public async upsert(newProduct: NewProduct): Promise<void> {
        this._upsert({ uid: newProduct.uid }, newProduct);
    }


    public async find(params: FindParams): Promise<NewProduct[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        return this._delete(params);
    }
}