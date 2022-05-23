import { NewProduct } from "../../types";
import { INewProductStore } from "./INewProductStore";


export class NewProductStoreInMemory implements INewProductStore {
    public store: NewProduct[] = [];


    public async add(product: NewProduct): Promise<void> {
        this.store.push(this.deepCopy(product));
    }

    private deepCopy(product: NewProduct): NewProduct {
        return JSON.parse(JSON.stringify(product));
    }


    public async find(params: {uid?: string}): Promise<NewProduct[]> {
        const { uid } = params;
        if (uid) {
            return this.store.filter(product => product.uid === uid);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this.store = this.store.filter(product => product.uid !== uid);
    }


    public clear(): void {
        this.store = [];
    }
}