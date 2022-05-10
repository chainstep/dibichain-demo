import { Request } from "express";
import { Greeting, IGreetingStore } from "../../../../storage/greeting/IGreetingStore";
import { RouteService } from "../../routerFactory";


export interface RetrieveGreetingsServiceOptions {
    getGreetingStore: () => IGreetingStore;
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Inputs {}

interface Outputs {
    greetings: Greeting[];
}


export class RetrieveGreetingsService implements RouteService {
    private readonly getGreetingStore: () => IGreetingStore;


    constructor(options: RetrieveGreetingsServiceOptions) {
        this.getGreetingStore = options.getGreetingStore;
    }


    public async run(inputs: Inputs, request: Request): Promise<Outputs> {
        const greetingStore = this.getGreetingStore();
        const greetings = await greetingStore.find();

        return { greetings };
    }
}