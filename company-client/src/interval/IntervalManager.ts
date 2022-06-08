import { IntervalHandler } from "./IntervalHandler";


export class IntervalManager {
    private static intervalHandlers: IntervalHandler[] = [];


    public static add(intervalHandler: IntervalHandler) {
        if (this.get(intervalHandler.getName())) {
            return;
        }
        this.intervalHandlers.push(intervalHandler);
    }


    public static get(handlerName: string): IntervalHandler | undefined {
        return this.intervalHandlers.find(intervalHandler => intervalHandler.getName() === handlerName);
    }


    public static start(handlerName?: string): void {
        if (handlerName) {
            const handler = this.get(handlerName);
            handler?.start();
        } else {
            this.intervalHandlers.forEach(handler => handler.start());
        }
    }


    public static stop(handlerName?: string): void {
        if (handlerName) {
            const handler = this.get(handlerName);
            handler?.stop();
        } else {
            this.intervalHandlers.forEach(handler => handler.stop());
        }
    }


    public static remove(handlerName: string): void {
        const handler = this.get(handlerName);
        handler?.stop();
        this.intervalHandlers = this.intervalHandlers.filter(handler => handler.getName() !== handlerName);
    }
}