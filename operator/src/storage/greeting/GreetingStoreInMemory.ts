import { Greeting, IGreetingStore } from "./IGreetingStore";


export class GreetingStoreInMemory implements IGreetingStore {
    public store: Greeting[] = [];


    public async add(greeting: Greeting): Promise<void> {
        const greetingIndex = this.store.findIndex(_greeting => _greeting.setter === greeting.setter);
        if (greetingIndex === -1) {
            this.store.push(this.deepCopy(greeting));
        } else {
            this.store[greetingIndex] = this.deepCopy(greeting);
        }
    }

    private deepCopy(greeting: Greeting): Greeting {
        return JSON.parse(JSON.stringify(greeting));
    }


    public async find(setter?: string): Promise<Greeting[]> {
        if (setter) {
            return this.store.filter(greeting => greeting.setter === setter);
        }
        return this.store;
    }


    public clear(): void {
        this.store = [];
    }
}