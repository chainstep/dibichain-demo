import { MyProduct } from "../../types";


export interface FindParams {
    uid?: string;
    id?: string;
    name?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface IMyProductStore {
    upsert(myProduct: MyProduct): Promise<void>;
    find(params: FindParams): Promise<MyProduct[]>;
    delete(params: DeleteParams): Promise<void>;
}