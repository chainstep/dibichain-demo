import { Product } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, FindParams, IProductStore } from "./IProductStore";


export class ProductStoreInMemory extends AInMemoryStore implements IProductStore {
    public store: Product[] = [];


    public async upsert(product: Product): Promise<void> {
        this._upsert({ uid: product.uid }, product);
    }


    public async find(params: FindParams): Promise<Product[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        this._delete(params);
    }
}