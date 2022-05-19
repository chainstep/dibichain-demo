import { INewProductEventStore } from "./INewProductEventStore";


export class NewProductEventStore {
    private static store: INewProductEventStore;


    public static init(store: INewProductEventStore): void {
        this.store = store;
    }


    public static get(): INewProductEventStore {
        if (!this.store) {
            throw new Error("NewProductEvent store not initialized! Call init function first");
        }
        return this.store;
    }
}