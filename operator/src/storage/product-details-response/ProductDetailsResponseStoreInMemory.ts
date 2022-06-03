import { AInMemoryStore } from "../AInMemoryStore";
import { IProductDetailsResponseStore, ProductDetailsResponse } from "./IProductDetailsResponseStore";


export class ProductDetailsResponseStoreInMemory extends AInMemoryStore implements IProductDetailsResponseStore {
    public store: ProductDetailsResponse[] = [];


    public async upsert(productDetailsResponse: ProductDetailsResponse): Promise<void> {
        this._upsert(productDetailsResponse, Object.keys(productDetailsResponse));
    }


    public async find(params: {uid?: string, publicKey?: string}): Promise<ProductDetailsResponse[]> {
        const { uid, publicKey } = params;
        return this.store.filter((object) => {
            if (uid && publicKey) {
                return object.uid === uid && object.publicKey === publicKey;
            } else if (uid) {
                return object.uid === uid;
            } else if (publicKey) {
                return object.publicKey === publicKey;
            } else {
                return true;
            }
        });
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this._delete("uid", uid);
    }
}