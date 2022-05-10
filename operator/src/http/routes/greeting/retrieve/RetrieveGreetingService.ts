import { Request } from "express";
import { Greeter } from "../../../../contract/interfaces/Greeter";
import { Greeting, IGreetingStore } from "../../../../storage/greeting/IGreetingStore";
import { RouteService } from "../../routerFactory";


export interface RetrieveGreetingServiceOptions {
    getGreeterContract: () => Greeter;
    getGreetingStore: () => IGreetingStore;
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Inputs {
    setter?: string;
}

interface Outputs {
    greeting: Greeting | undefined;
}


export class RetrieveGreetingService implements RouteService {
    private readonly getGreeterContract: () => Greeter;
    private readonly getGreetingStore: () => IGreetingStore;


    constructor(options: RetrieveGreetingServiceOptions) {
        this.getGreeterContract = options.getGreeterContract;
        this.getGreetingStore = options.getGreetingStore;
    }


    public async run(inputs: Inputs, request: Request): Promise<Outputs> {
        let greeting = <Greeting | undefined> {};

        if (inputs.setter) {
            greeting = await this.findGreeting(inputs.setter);
        } else {
            greeting = await this.getCurrentGreeting();
        }

        return { greeting };
    }

    private async findGreeting(setter: string): Promise<Greeting | undefined> {
        const greetingStore = this.getGreetingStore();
        return (await greetingStore.find(setter))[0];
    }

    private async getCurrentGreeting(): Promise<Greeting> {
        const greeter = this.getGreeterContract();
        const greetResponse = await greeter.greet();
        return {
            text: greetResponse[0],
            setter: greetResponse[1]
        };
    }
}