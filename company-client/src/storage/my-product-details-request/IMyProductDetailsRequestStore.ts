import { MyProductDetailsRequest } from "../../types";

export interface IMyProductDetailsRequestStore {
    add(request: MyProductDetailsRequest): Promise<void>;
    find(params: {uid?: string}): Promise<MyProductDetailsRequest[]>;
    delete(params: {uid: string}): Promise<void>;
}