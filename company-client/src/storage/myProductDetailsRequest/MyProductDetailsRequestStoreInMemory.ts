import { MyProductDetailsRequest } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IMyProductDetailsRequestStore } from "./IMyProductDetailsRequestStore";


export class MyProductDetailsRequestStoreInMemory extends AInMemoryStore implements IMyProductDetailsRequestStore {
    public store: MyProductDetailsRequest[] = [];


    public async add(productDetailsRequest: MyProductDetailsRequest): Promise<void> {
        this.store.push(this.deepCopy(productDetailsRequest));
    }


    public async find(params: {uid?: string}): Promise<MyProductDetailsRequest[]> {
        const { uid } = params;
        if (uid) {
            return this.store.filter(productDetailsRequest => productDetailsRequest.uid === uid);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this.store = this.store.filter(productDetailsRequest => productDetailsRequest.uid !== uid);
    }
}