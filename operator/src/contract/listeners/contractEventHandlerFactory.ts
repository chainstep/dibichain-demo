import { Contract } from "ethers";
import { logger } from "../../utils/logger";


export interface EventHandlerService {
    run(args: unknown[], contract?: Contract): Promise<void>
}


export interface EventHandlerParams {
    eventName: string;
    service: EventHandlerService
}


export function createContractEventHandler(contract: Contract, params: EventHandlerParams): void {
    const { eventName, service } = params;
    contract.on(eventName, async (...args: unknown[]) => {
        try {
            await service.run(args, contract);
        } catch (error) {
            logger.error((<Error> error).message);
        }
    });
}