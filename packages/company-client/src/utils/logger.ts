/* eslint-disable max-classes-per-file */
import winston, { format } from "winston";
import Transport from "winston-transport";


interface ExtraLogLevels {
    event(message: string, ...meta: unknown[]): void;
}


export let logger = <winston.Logger & ExtraLogLevels> {};


export function initLogger(options: winston.LoggerOptions): void {
    options.levels = {
        error: 0,
        info: 1,
        event: 2,
        http: 3,
        debug: 4,
        all: 5
    };
    logger = <winston.Logger & ExtraLogLevels> winston.createLogger(options);

    logger.event = (message: string, ...meta: unknown[]) => {
        logger.log("event", message, meta);
    };
}


export class DummyTransport extends Transport {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public log(info: unknown, callback: unknown): void {}
}


export class ConsoleTransport extends winston.transports.Console {
    constructor() {
        super({
            format: format.combine(
                format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        });
    }
}