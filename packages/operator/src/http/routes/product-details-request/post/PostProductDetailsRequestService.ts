import { EventBus } from "../../../../contract/interfaces/EventBus";
import { RouteService } from "../../../routerFactory";


export interface ServiceOptions {
    eventBus: EventBus;
}

interface Inputs {
    uid: string;
    publicKey: string;
    algorithm: string;
}


export class PostProductDetailsRequestService implements RouteService {
    constructor(private readonly options: ServiceOptions) {}


    public async run(inputs: Inputs): Promise<void> {
        await this.options.eventBus.broadcastProductDetailsRequest(inputs);
    }
}