import { IGreetingStore } from "./IGreetingStore";


export class GreetingStore {
    private static store: IGreetingStore;


    public static init(store: IGreetingStore): void {
        this.store = store;
    }


    public static get(): IGreetingStore {
        if (!this.store) {
            throw new Error("Greeting store not initialized! Call init function first");
        }
        return this.store;
    }
}