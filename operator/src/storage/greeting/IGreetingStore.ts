export type Greeting = {
    text: string;
    setter: string;
}


export interface IGreetingStore {
    add(greeting: Greeting): Promise<void>;
    find(setter?: string): Promise<Greeting[]>;
}