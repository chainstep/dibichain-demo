import { AInMemoryStore } from "../AInMemoryStore";
import { IProductDetailsResponseStore, ProductDetailsResponse } from "./IProductDetailsResponseStore";


export class ProductDetailsResponseStoreInMemory extends AInMemoryStore implements IProductDetailsResponseStore {
    public store: ProductDetailsResponse[] = [];


    public async upsert(productDetailsResponse: ProductDetailsResponse): Promise<void> {
        this._upsert(productDetailsResponse, "uid");
    }


    public async find(params: {uid: string, publicKey: string}): Promise<ProductDetailsResponse[]> {
        const { uid, publicKey } = params;
        return this.store.filter((object) => {
            return object.uid === uid && object.publicKey === publicKey;
        });
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this._delete("uid", uid);
    }
}