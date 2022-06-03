import { IntervalHandler } from "./IntervalHandler";


export class IntervalManager {
    private static intervalHandlers: IntervalHandler[] = [];


    public static addIntervalHandler(intervalHandler: IntervalHandler) {
        if (this.getIntervalHandler(intervalHandler.getName())) {
            return;
        }
        this.intervalHandlers.push(intervalHandler);
    }


    public static getIntervalHandler(name: string): IntervalHandler | undefined {
        return this.intervalHandlers.find(intervalHandler => intervalHandler.getName() === name);
    }


    public static startIntervalHandler(name: string): void {
        const handler = this.getIntervalHandler(name);
        handler?.start();
    }


    public static stopIntervalHandler(name?: string): void {
        if (name) {
            const handler = this.getIntervalHandler(name);
            handler?.stop();
        } else {
            this.intervalHandlers.forEach(handler => handler.stop());
        }
    }


    public static removeIntervalHandler(name: string): void {
        const handler = this.getIntervalHandler(name);
        handler?.stop();
        this.intervalHandlers = this.intervalHandlers.filter(handler => handler.getName() !== name);
    }
}