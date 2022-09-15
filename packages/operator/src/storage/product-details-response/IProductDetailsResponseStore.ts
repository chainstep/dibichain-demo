import { ProductDetailsResponse } from "../../types";


export interface FindParams {
    uid?: string;
    publicKey?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface IProductDetailsResponseStore {
    upsert(response: ProductDetailsResponse): Promise<void>;
    find(params: FindParams): Promise<ProductDetailsResponse[]>;
    delete(params: DeleteParams): Promise<void>;
}