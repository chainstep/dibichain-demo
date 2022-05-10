import { GreetingStore } from "../../../storage/greeting/GreetingStore";
import { Greeter } from "../../interfaces/Greeter";
import { createContractEventHandler } from "../contractEventHandlerFactory";
import { GreetingUpdateService } from "./GreetingUpdateService";


export async function initGreetingUpdateListener(greeter: Greeter): Promise<void> {
    const eventName = "GreetingUpdate";
    const service = new GreetingUpdateService({
        getGreetingStore: () => GreetingStore.get()
    });

    createContractEventHandler(greeter, {
        eventName,
        service
    });
}