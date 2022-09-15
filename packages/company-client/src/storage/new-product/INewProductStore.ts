import { NewProduct } from "../../types";


export interface FindParams {
    uid?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface INewProductStore {
    upsert(newProduct: NewProduct): Promise<void>;
    find(params: FindParams): Promise<NewProduct[]>;
    delete(params: DeleteParams): Promise<void>;
}