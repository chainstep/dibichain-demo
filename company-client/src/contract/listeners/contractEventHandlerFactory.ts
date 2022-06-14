import { Contract } from "ethers";
import { logger } from "../../utils/logger";


export enum ContractEventServiceCode {
    CONTINUE,
    STOP
}

export interface ContractEventHandlerService {
    run(args: unknown[], contract?: Contract): Promise<void | ContractEventServiceCode>
}

export interface ContractEventListener {
    eventName: string,
    services: ContractEventHandlerService[];
}

export interface ContractEventHandlerFactoryParams {
    contract: Contract;
    eventListener: ContractEventListener;
}
// provider.once("block", () => {
//     factoryContract.on('TokenCreated', newToken);
// });

export function createContractEventHandler(params: ContractEventHandlerFactoryParams): void {
    const { contract, eventListener } = params;
    const { eventName, services } = eventListener;
    contract.on(eventName, async (...args: unknown[]) => {
        try {
            for (let i = 0 ; i < services.length ; i++) {
                const code = await services[i].run(args);
                if (code && code === ContractEventServiceCode.STOP) {
                    return;
                }
            }
        } catch (error) {
            logger.error((<Error> error).message);
        }
    });
}