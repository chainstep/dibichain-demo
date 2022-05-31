import { MyProductDetailsRequest } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IMyProductDetailsRequestStore } from "./IMyProductDetailsRequestStore";


export class MyProductDetailsRequestStoreInMemory extends AInMemoryStore implements IMyProductDetailsRequestStore {
    public store: MyProductDetailsRequest[] = [];


    public async upsert(myProductDetailsRequest: MyProductDetailsRequest): Promise<void> {
        this._upsert(myProductDetailsRequest, "uid");
    }


    public async find(params: {uid?: string}): Promise<MyProductDetailsRequest[]> {
        const { uid } = params;
        if (uid) {
            return this._find("uid", uid);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this._delete("uid", uid);
    }
}