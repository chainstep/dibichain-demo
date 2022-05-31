import { ProductDetailsRequest } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IProductDetailsRequestStore } from "./IProductDetailsRequestStore";


export class ProductDetailsRequestStoreInMemory extends AInMemoryStore implements IProductDetailsRequestStore {
    public store: ProductDetailsRequest[] = [];


    public async upsert(productDetailsRequest: ProductDetailsRequest): Promise<void> {
        this._upsert(productDetailsRequest, "uid");
    }


    public async find(params: {uid?: string}): Promise<ProductDetailsRequest[]> {
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