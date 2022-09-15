import { ProductDetailsRequest } from "../../types";


export interface FindParams {
    uid?: string;
    publicKey?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface IProductDetailsRequestStore {
    upsert(request: ProductDetailsRequest): Promise<void>;
    find(params: FindParams): Promise<ProductDetailsRequest[]>;
    delete(params: DeleteParams): Promise<void>;
}