import { EventBus } from "./interfaces/EventBus";


export class Contracts {
    private static eventBus: EventBus;


    public static init(contracts: { eventBus: EventBus }) {
        this.eventBus = contracts.eventBus;
    }


    public static getEventBus(): EventBus {
        return this.eventBus;
    }
}