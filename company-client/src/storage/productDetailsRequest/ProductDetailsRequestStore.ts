import { IProductDetailsRequestStore } from "./IProductDetailsRequestStore";


export class ProductDetailsRequestStore {
    private static store: IProductDetailsRequestStore;


    public static init(store: IProductDetailsRequestStore): void {
        this.store = store;
    }


    public static get(): IProductDetailsRequestStore {
        if (!this.store) {
            throw new Error("ProductDetailsRequest store not initialized! Call init function first");
        }
        return this.store;
    }
}