import { IMyNewProductStore } from "./IMyNewProductStore";


export class MyNewProductStore {
    private static store: IMyNewProductStore;


    public static init(store: IMyNewProductStore): void {
        this.store = store;
    }


    public static get(): IMyNewProductStore {
        if (!this.store) {
            throw new Error("MyNewProduct store not initialized! Call init function first");
        }
        return this.store;
    }
}