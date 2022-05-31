import { MyProduct } from "../../types";


export interface IMyProductStore {
    upsert(myProduct: MyProduct): Promise<void>;
    find(params: {id?: string, uid?: string, name?: string}): Promise<MyProduct[]>;
}