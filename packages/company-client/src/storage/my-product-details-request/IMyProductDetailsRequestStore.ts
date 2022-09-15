import { MyProductDetailsRequest } from "../../types";


export interface FindParams {
    uid?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface IMyProductDetailsRequestStore {
    upsert(request: MyProductDetailsRequest): Promise<void>;
    find(params: FindParams): Promise<MyProductDetailsRequest[]>;
    delete(params: DeleteParams): Promise<void>;
}