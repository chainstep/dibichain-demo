import { Product } from "../../types";


export interface IProductStore {
    upsert(product: Product): Promise<void>;
    find(params: {id?: string, uid?: string, name?: string}): Promise<Product[]>;
    delete(params: {uid?: string}): Promise<void>;
}