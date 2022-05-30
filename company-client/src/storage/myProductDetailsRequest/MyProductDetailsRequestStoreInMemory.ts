import { MyProductDetailsRequest } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { IMyProductDetailsRequestStore } from "./IMyProductDetailsRequestStore";


export class MyProductDetailsRequestStoreInMemory extends AInMemoryStore implements IMyProductDetailsRequestStore {
    public store: MyProductDetailsRequest[] = [];


    public async add(myProductDetailsRequest: MyProductDetailsRequest): Promise<void> {
        this.store.push(this.deepCopy(myProductDetailsRequest));
    }


    public async find(params: {uid?: string}): Promise<MyProductDetailsRequest[]> {
        const { uid } = params;
        if (uid) {
            return this.store.filter(myProductDetailsRequest => myProductDetailsRequest.uid === uid);
        }
        return this.store;
    }


    public async delete(params: {uid: string}): Promise<void> {
        const { uid } = params;
        this.store = this.store.filter(myProductDetailsRequest => myProductDetailsRequest.uid !== uid);
    }
}