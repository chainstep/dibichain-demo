import { ProductDetailsRequest } from "../../types";

export interface IProductDetailsRequestStore {
    upsert(request: ProductDetailsRequest): Promise<void>;
    find(params: {uid?: string, publicKey?: string}): Promise<ProductDetailsRequest[]>;
    delete(params: {uid: string}): Promise<void>;
}