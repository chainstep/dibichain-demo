import { MyNewProduct } from "../../types";

export interface IMyNewProductStore {
    upsert(event: MyNewProduct): Promise<void>;
    find(params: {uid?: string}): Promise<MyNewProduct[]>;
    delete(params: {uid: string}): Promise<void>;
}