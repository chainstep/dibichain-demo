import { ProductDetailsRequest } from "../../types";
import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, FindParams, IProductDetailsRequestStore } from "./IProductDetailsRequestStore";


export class ProductDetailsRequestStoreInMemory extends AInMemoryStore implements IProductDetailsRequestStore {
    public store: ProductDetailsRequest[] = [];


    public async upsert(productDetailsRequest: ProductDetailsRequest): Promise<void> {
        this._upsert({ uid: productDetailsRequest.uid }, productDetailsRequest);
    }


    public async find(params: FindParams): Promise<ProductDetailsRequest[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        return this._delete(params);
    }
}