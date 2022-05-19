import { Contract, Event } from "ethers";
import { ContractEventListener, ContractEventMiddleware } from "./contractEventHandlerFactory";


export interface EventHandlerService {
    run(args: unknown[], contract?: Contract): Promise<void>
}

export interface EventSetups {
    eventListener: ContractEventListener;
    eventFilter?: (events: Event[]) => Event[];
    middlewares?: ContractEventMiddleware[];
}

export type EventsCallback = (eventName: string, args: unknown[]) => Promise<void>;

export interface EventCatchUpperParams {
    contract: Contract;
    fromBlockHeight: number;
    eventSetups: EventSetups[];
    eventsCallbacks?: EventsCallback[];
}


export async function catchUpEvents(params: EventCatchUpperParams): Promise<void> {
    const { contract, eventSetups, fromBlockHeight, eventsCallbacks } = params;
    const provider = contract.provider;

    let _fromBlockHeight = fromBlockHeight;
    let toBlockHeight = await provider.getBlockNumber();
    if (toBlockHeight === _fromBlockHeight) {
        toBlockHeight++;
    }

    while (_fromBlockHeight < toBlockHeight) {
        const events = await getEvents(
            contract,
            eventSetups,
            _fromBlockHeight,
            toBlockHeight
        );
        await callEventsCallback(events, eventsCallbacks);

        const filteredEvents = getFilteredEvents(events, eventSetups);
        await callServices(filteredEvents, eventSetups);

        _fromBlockHeight = toBlockHeight;
        toBlockHeight = await provider.getBlockNumber();
    }
}

async function getEvents(
    contract: Contract,
    eventSetups: EventSetups[],
    fromBlockHeight: number,
    toBlockHeight: number
): Promise<Event[]> {
    let events: Event[] = [];
    for (let i = 0 ; i < eventSetups.length ; i++) {
        const eventName = eventSetups[i].eventListener.eventName;
        const filterEvents = await contract.queryFilter(
            contract.filters[eventName](),
            fromBlockHeight,
            toBlockHeight
        );
        events = [...events, ...filterEvents];
    }
    return events.sort((a, b) => a.blockNumber - b.blockNumber);
}

async function callEventsCallback(events: Event[], cbs?: EventsCallback[]): Promise<void> {
    for (let i = 0 ; i < events.length ; i++) {
        const event = events[i];
        if (cbs) {
            for (let j = 0 ; j < cbs.length ; j++) {
                await cbs[j](event.event || "", [...event.args || [], event]);
            }
        }
    }
}

function getFilteredEvents(events: Event[], eventSetups: EventSetups[]): Event[] {
    let filteredEvents: Event[] = [];
    for (let i = 0 ; i < eventSetups.length ; i++) {
        const { eventName } = eventSetups[i].eventListener;
        const { eventFilter } = eventSetups[i];

        let filterEvents = events.filter(event => event.event === eventName);
        if (eventFilter) {
            filterEvents = eventFilter(filterEvents);
        }
        filteredEvents = [...filteredEvents, ...filterEvents];
    }
    return filteredEvents.sort((a, b) => a.blockNumber - b.blockNumber);
}

async function callServices(
    events: Event[],
    eventSetups: EventSetups[]
): Promise<void> {
    for (let i = 0 ; i < events.length ; i++) {
        const event = events[i];

        for (let j = 0 ; j < eventSetups.length ; j++) {
            const { eventName, service, middlewares } = eventSetups[j].eventListener;

            if (event.event === eventName) {
                if (middlewares) {
                    for (let j = 0 ; j < middlewares.length ; j++) {
                        await middlewares[j]([...event.args || [], event]);
                    }
                }
                await service.run([...event.args || [], event]);
            }
        }
    }
}