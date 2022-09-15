import { MyNewProduct } from "../../types";


export interface FindParams {
    uid?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface IMyNewProductStore {
    upsert(event: MyNewProduct): Promise<void>;
    find(params: FindParams): Promise<MyNewProduct[]>;
    delete(params: DeleteParams): Promise<void>;
}