import { ProductDetailsResponse } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IProductDetailsResponseStore } from "./IProductDetailsResponseStore";


export class ProductDetailsResponseStoreInMemory extends AInMemoryStore implements IProductDetailsResponseStore {
    public store: ProductDetailsResponse[] = [];


    public async upsert(productDetailsResponse: ProductDetailsResponse): Promise<void> {
        this._upsert(productDetailsResponse, productDetailsResponse);
    }


    public async find(params: {uid?: string, publicKey?: string}): Promise<ProductDetailsResponse[]> {
        return this._find(params);
    }


    public async delete(params: {uid: string}): Promise<void> {
        return this._delete(params);
    }
}