import { Event } from "ethers";
import { IGreetingStore } from "../../../storage/greeting/IGreetingStore";
import { logger } from "../../../utils/logger";
import { EventHandlerService } from "../contractEventHandlerFactory";


interface GreetingUpdateServiceOptions {
    getGreetingStore: () => IGreetingStore;
}


export class GreetingUpdateService implements EventHandlerService {
    private readonly getGreetingStore: () => IGreetingStore;


    constructor(options: GreetingUpdateServiceOptions) {
        this.getGreetingStore = options.getGreetingStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const greetingStore = this.getGreetingStore();
        const setter = <string> inputs[0];
        const text = <string> inputs[1];
        const event = <Event> inputs[2];

        logger.event("GreetingUpdate -> block: " + event.blockNumber + ", setter: " + setter + ", text: " + text);

        try {
            await greetingStore.add({
                text,
                setter
            });
        } catch (error) {
            logger.error((<Error> error).message + " -> block: " + event.blockNumber, "setter: " + setter);
        }
    }
}