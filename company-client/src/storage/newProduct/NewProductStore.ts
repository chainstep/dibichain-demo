import { INewProductStore } from "./INewProductStore";


export class NewProductStore {
    private static store: INewProductStore;


    public static init(store: INewProductStore): void {
        this.store = store;
    }


    public static get(): INewProductStore {
        if (!this.store) {
            throw new Error("NewProduct store not initialized! Call init function first");
        }
        return this.store;
    }
}