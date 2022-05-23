import { NewProduct } from "../../types";

export interface INewProductStore {
    add(event: NewProduct): Promise<void>;
    find(params: {uid?: string}): Promise<NewProduct[]>;
    delete(params: {uid: string}): Promise<void>;
}