import { IProductStore } from "./IProductStore";


export class ProductStore {
    private static store: IProductStore;


    public static init(store: IProductStore): void {
        this.store = store;
    }


    public static get(): IProductStore {
        if (!this.store) {
            throw new Error("Product store not initialized! Call init function first");
        }
        return this.store;
    }
}