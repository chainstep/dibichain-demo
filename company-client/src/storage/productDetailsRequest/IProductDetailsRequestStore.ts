import { ProductDetailsRequest } from "../../types";

export interface IProductDetailsRequestStore {
    add(request: ProductDetailsRequest): Promise<void>;
    find(params: {uid?: string}): Promise<ProductDetailsRequest[]>;
    delete(params: {uid: string}): Promise<void>;
}