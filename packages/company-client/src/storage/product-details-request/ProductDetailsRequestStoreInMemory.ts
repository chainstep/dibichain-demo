import { ProductDetailsRequest } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IProductDetailsRequestStore } from "./IProductDetailsRequestStore";


export class ProductDetailsRequestStoreInMemory extends AInMemoryStore implements IProductDetailsRequestStore {
    public store: ProductDetailsRequest[] = [];


    public async upsert(productDetailsRequest: ProductDetailsRequest): Promise<void> {
        this._upsert(productDetailsRequest, "uid");
    }


    public async find(params: {uid?: string, publicKey?: string}): Promise<ProductDetailsRequest[]> {
        const { uid, publicKey } = params;
        if (uid && publicKey) {
            return this._find(["uid", "publicKey"], [uid, publicKey]);
        }
        if (uid) {
            return this._find(["uid"], [uid]);
        }
        if (publicKey) {
            return this._find(["publicKey"], [publicKey]);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this._delete("uid", uid);
    }
}