import { NewProductEvent } from "../../types";
import { INewProductEventStore } from "./INewProductEventStore";


export class NewProductEventStoreInMemory implements INewProductEventStore {
    public store: NewProductEvent[] = [];


    public async add(product: NewProductEvent): Promise<void> {
        this.store.push(this.deepCopy(product));
    }

    private deepCopy(product: NewProductEvent): NewProductEvent {
        return JSON.parse(JSON.stringify(product));
    }


    public async find(params: {uid?: string}): Promise<NewProductEvent[]> {
        const { uid } = params;
        if (uid) {
            return this.store.filter(product => product.uid === uid);
        }
        return this.store;
    }


    public clear(): void {
        this.store = [];
    }
}