import { IMyDocumentStore } from "./IMyDocumentStore";


export class MyDocumentStore {
    private static store: IMyDocumentStore;


    public static init(store: IMyDocumentStore): void {
        this.store = store;
    }


    public static get(): IMyDocumentStore {
        if (!this.store) {
            throw new Error("MyDocument store not initialized! Call init function first");
        }
        return this.store;
    }
}