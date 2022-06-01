import { AInMemoryStore } from "../AInMemoryStore";
import { IProductDetailsResponseStore, ProductDetailsResponse } from "./IProductDetailsResponseStore";


export class ProductDetailsResponseStoreInMemory extends AInMemoryStore implements IProductDetailsResponseStore {
    public store: ProductDetailsResponse[] = [];


    public async upsert(productDetailsResponse: ProductDetailsResponse): Promise<void> {
        this._upsert(productDetailsResponse, "uid");
    }


    public async find(params: {uid?: string}): Promise<ProductDetailsResponse[]> {
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