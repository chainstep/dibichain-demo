import { NewProduct } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { INewProductStore } from "./INewProductStore";


export class NewProductStoreInMemory extends AInMemoryStore implements INewProductStore {
    public store: NewProduct[] = [];


    public async upsert(newProduct: NewProduct): Promise<void> {
        this._upsert(newProduct, "uid");
    }


    public async find(params: {uid?: string}): Promise<NewProduct[]> {
        const { uid } = params;
        if (uid) {
            return this._find("uid", uid);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this._delete("uid", uid);
    }
}