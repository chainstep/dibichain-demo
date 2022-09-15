import { Product } from "../../types";


export interface FindParams {
    uid?: string;
    id?: string;
    name?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface IProductStore {
    upsert(product: Product): Promise<void>;
    find(params: FindParams): Promise<Product[]>;
    delete(params: DeleteParams): Promise<void>;
}