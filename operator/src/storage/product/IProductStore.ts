import { Product } from "../../types";


export interface IProductStore {
    add(product: Product): Promise<void>;
    find(params: {id?: string, uid?: string, name?: string}): Promise<Product[]>;
}