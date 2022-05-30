import { IMyProductDetailsRequestStore } from "./IMyProductDetailsRequestStore";


export class MyProductDetailsRequestStore {
    private static store: IMyProductDetailsRequestStore;


    public static init(store: IMyProductDetailsRequestStore): void {
        this.store = store;
    }


    public static get(): IMyProductDetailsRequestStore {
        if (!this.store) {
            throw new Error("MyProductDetailsRequest store not initialized! Call init function first");
        }
        return this.store;
    }
}