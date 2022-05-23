import { Contract } from "ethers";
import { logger } from "../../utils/logger";


export interface ContractEventHandlerService {
    run(args: unknown[], contract?: Contract): Promise<void>
}

export interface ContractEventListener {
    eventName: string,
    service: ContractEventHandlerService;
    middlewares?: ContractEventMiddleware[];
}

export enum ContractEventMiddlewareCode {
    CONTINUE,
    STOP
}

export type ContractEventMiddleware = (args: unknown[]) => Promise<ContractEventMiddlewareCode | void>

export interface ContractEventHandlerFactoryParams {
    contract: Contract;
    eventListener: ContractEventListener;
}

export function createContractEventHandler(params: ContractEventHandlerFactoryParams): void {
    const { contract, eventListener } = params;
    const { eventName, service, middlewares } = eventListener;
    contract.on(eventName, async (...args: unknown[]) => {
        try {
            if (middlewares) {
                for (let i = 0 ; i < middlewares.length ; i++) {
                    const code = await middlewares[i](args);
                    if (code && code === ContractEventMiddlewareCode.STOP) {
                        return;
                    }
                }
            }
            await service.run(args, contract);
        } catch (error) {
            logger.error((<Error> error).message);
        }
    });
}