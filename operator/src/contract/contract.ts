import { Greeter } from "./interfaces/Greeter";
import { initGreetingUpdateListener } from "./listeners/greetingUpdate/greetingUpdate";


export function initContractListeners(contract: Greeter): void {
    initGreetingUpdateListener(contract);
}