import { Product } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IProductStore } from "./IProductStore";


export class ProductStoreInMemory extends AInMemoryStore implements IProductStore {
    public store: Product[] = [];


    public async upsert(product: Product): Promise<void> {
        this._upsert(product, "uid");
    }


    public async find(params: {id?: string, uid?: string, name?: string}): Promise<Product[]> {
        const { id, uid, name } = params;
        if (uid) {
            return this._find("uid", uid);
        }
        if (id) {
            return this._find("id", id);
        }
        if (name) {
            return this._find("name", name);
        }
        return this.store;
    }
}