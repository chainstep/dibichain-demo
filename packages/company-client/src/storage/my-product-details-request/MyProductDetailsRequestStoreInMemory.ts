import { MyProductDetailsRequest } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IMyProductDetailsRequestStore } from "./IMyProductDetailsRequestStore";


export class MyProductDetailsRequestStoreInMemory extends AInMemoryStore implements IMyProductDetailsRequestStore {
    public store: MyProductDetailsRequest[] = [];


    public async upsert(myProductDetailsRequest: MyProductDetailsRequest): Promise<void> {
        this._upsert({ uid: myProductDetailsRequest.uid }, myProductDetailsRequest);
    }


    public async find(params: {uid?: string}): Promise<MyProductDetailsRequest[]> {
        return this._find(params);
    }


    public async delete(params: {uid: string}): Promise<void> {
        return this._delete(params);
    }
}