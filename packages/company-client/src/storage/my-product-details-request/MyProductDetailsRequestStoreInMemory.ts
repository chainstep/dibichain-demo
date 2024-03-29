import { MyProductDetailsRequest } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, FindParams, IMyProductDetailsRequestStore } from "./IMyProductDetailsRequestStore";


export class MyProductDetailsRequestStoreInMemory extends AInMemoryStore implements IMyProductDetailsRequestStore {
    public store: MyProductDetailsRequest[] = [];


    public async upsert(myProductDetailsRequest: MyProductDetailsRequest): Promise<void> {
        this._upsert({ uid: myProductDetailsRequest.uid }, myProductDetailsRequest);
    }


    public async find(params: FindParams): Promise<MyProductDetailsRequest[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        return this._delete(params);
    }
}