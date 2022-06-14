import { Contract, Event } from "ethers";
import { logger } from "../utils/logger";


export enum ContractEventServiceCode {
    CONTINUE,
    STOP
}

export interface ContractEventService {
    run(args: unknown[], contract?: Contract): Promise<void | ContractEventServiceCode>
}

export interface ContractEventListener {
    eventName: string,
    services: ContractEventService[];
}


export interface ContractEventHandlerOptions {
    contract: Contract;
}


export class ContractEventHandler {
    private readonly contract: Contract;
    private startBlockNumber = 0;


    constructor(options: ContractEventHandlerOptions) {
        this.contract = options.contract;
    }


    public async init(): Promise<void> {
        this.startBlockNumber = await this.contract.provider.getBlockNumber();
    }


    public add(listener: ContractEventListener) {
        const { eventName, services } = listener;
        this.contract.on(eventName, async (...args: unknown[]) => {
            if (!this.isNewEvent(this.startBlockNumber, <Event> args[args.length - 1])) {
                return;
            }

            try {
                for (let i = 0 ; i < services.length ; i++) {
                    const code = await services[i].run(args);
                    if (code && code === ContractEventServiceCode.STOP) {
                        break;
                    }
                }
            } catch (error) {
                logger.error((<Error> error).message);
            }
        });
    }

    private isNewEvent(startBlockNumber: number, event: Event) {
        return event.blockNumber > startBlockNumber;
    }
}