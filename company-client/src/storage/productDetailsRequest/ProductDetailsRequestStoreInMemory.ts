import { ProductDetailsRequest } from "../../types";
import { IProductDetailsRequestStore } from "./IProductDetailsRequestStore";


export class ProductDetailsRequestStoreInMemory implements IProductDetailsRequestStore {
    public store: ProductDetailsRequest[] = [];


    public async add(productDetailsRequest: ProductDetailsRequest): Promise<void> {
        this.store.push(this.deepCopy(productDetailsRequest));
    }

    private deepCopy(productDetailsRequest: ProductDetailsRequest): ProductDetailsRequest {
        return JSON.parse(JSON.stringify(productDetailsRequest));
    }


    public async find(params: {uid?: string}): Promise<ProductDetailsRequest[]> {
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


    public clear(): void {
        this.store = [];
    }
}