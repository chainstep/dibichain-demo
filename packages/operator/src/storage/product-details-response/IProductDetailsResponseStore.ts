import { ProductDetailsResponse } from "../../types";


export interface IProductDetailsResponseStore {
    upsert(response: ProductDetailsResponse): Promise<void>;
    find(params: {uid?: string, publicKey?: string}): Promise<ProductDetailsResponse[]>;
    delete(params: {uid: string}): Promise<void>;
}