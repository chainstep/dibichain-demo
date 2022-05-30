import { NewProduct } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { INewProductStore } from "./INewProductStore";


export class NewProductStoreInMemory extends AInMemoryStore implements INewProductStore {
    public store: NewProduct[] = [];


    public async add(newProduct: NewProduct): Promise<void> {
        this.store.push(this.deepCopy(newProduct));
    }


    public async find(params: {uid?: string}): Promise<NewProduct[]> {
        const { uid } = params;
        if (uid) {
            return this.store.filter(newProduct => newProduct.uid === uid);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this.store = this.store.filter(newProduct => newProduct.uid !== uid);
    }
}