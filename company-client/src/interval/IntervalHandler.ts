import { logger } from "../utils/logger";


export interface IntervalService {
    run(): Promise<void>
}

interface IntervalHandlerOptions {
    pollingIntervalSec: number;
    services: IntervalService[];
    name: string;
}


export class IntervalHandler {
    private intervalId = <ReturnType<typeof setInterval>> {};
    private readonly intervalSec: number;
    private readonly services: IntervalService[];
    private readonly name: string;


    constructor(options: IntervalHandlerOptions) {
        this.name = options.name;
        this.intervalSec = options.pollingIntervalSec;
        this.services = options.services;
    }


    public start() {
        if (!this.isEmpty(this.intervalId)) {
            return;
        }
        this.intervalId = setInterval(async () => {
            logger.debug("Running interval of handler "+ this.name + "...");
            await this.runServices();
            logger.debug("Interval of handler "+ this.name + "done");
        }, this.intervalSec * 1000);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    private isEmpty(object: Object): boolean {
        return Object.keys(object).length === 0;
    }

    private async runServices(): Promise<void> {
        for (let i = 0 ; i < this.services.length ; i++) {
            const service = this.services[i];
            try {
                await service.run();
            } catch (error) {
                logger.error((<Error> error).message);
            }
        }
    }


    public stop() {
        if (this.isEmpty(this.intervalId)) {
            return;
        }
        clearInterval(this.intervalId);
        this.intervalId = <ReturnType<typeof setInterval>> {};
    }

    public getName(): string {
        return this.name;
    }
}