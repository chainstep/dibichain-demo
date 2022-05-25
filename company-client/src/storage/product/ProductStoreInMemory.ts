import { Product } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IProductStore } from "./IProductStore";


export class ProductStoreInMemory extends AInMemoryStore implements IProductStore {
    public store: Product[] = [];


    public async add(product: Product): Promise<void> {
        this.store.push(this.deepCopy(product));
    }


    public async find(params: {id?: string, uid?: string, name?: string}): Promise<Product[]> {
        const { id, uid, name } = params;
        if (uid) {
            return this.store.filter(product => product.uid === uid);
        }
        if (id) {
            return this.store.filter(product => product.id === id);
        }
        if (name) {
            return this.store.filter(product => product.name === name);
        }
        return this.store;
    }
}