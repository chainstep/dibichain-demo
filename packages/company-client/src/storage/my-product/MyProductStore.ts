import { IMyProductStore } from "./IMyProductStore";


export class MyProductStore {
    private static store: IMyProductStore;


    public static init(store: IMyProductStore): void {
        this.store = store;
    }


    public static get(): IMyProductStore {
        if (!this.store) {
            throw new Error("MyProduct store not initialized! Call init function first");
        }
        return this.store;
    }
}