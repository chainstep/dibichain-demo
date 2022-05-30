import { MyProduct } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IMyProductStore } from "./IMyProductStore";


export class MyProductStoreInMemory extends AInMemoryStore implements IMyProductStore {
    public store: MyProduct[] = [];


    public async add(myProduct: MyProduct): Promise<void> {
        this.store.push(this.deepCopy(myProduct));
    }


    public async find(params: {id?: string, uid?: string, name?: string}): Promise<MyProduct[]> {
        const { id, uid, name } = params;
        if (uid) {
            return this.store.filter(myProduct => myProduct.uid === uid);
        }
        if (id) {
            return this.store.filter(myProduct => myProduct.id === id);
        }
        if (name) {
            return this.store.filter(myProduct => myProduct.name === name);
        }
        return this.store;
    }
}