import { Product } from "../../types";
import { IProductStore } from "./IProductStore";


export class ProductStoreInMemory implements IProductStore {
    public store: Product[] = [];


    public async add(product: Product): Promise<void> {
        this.store.push(this.deepCopy(product));
    }

    private deepCopy(product: Product): Product {
        return JSON.parse(JSON.stringify(product));
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


    public clear(): void {
        this.store = [];
    }
}