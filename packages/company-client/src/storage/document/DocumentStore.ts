import { IDocumentStore } from "./IDocumentStore";


export class DocumentStore {
    private static store: IDocumentStore;


    public static init(store: IDocumentStore): void {
        this.store = store;
    }


    public static get(): IDocumentStore {
        if (!this.store) {
            throw new Error("Document store not initialized! Call init function first");
        }
        return this.store;
    }
}