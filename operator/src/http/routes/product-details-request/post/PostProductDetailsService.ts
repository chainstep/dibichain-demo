import { EventBus } from "../../../../contract/interfaces/EventBus";
import { RouteService } from "../../routerFactory";


export interface PostProductDetailsRequestServiceOptions {
    getEventBus: () => EventBus;
}

interface Inputs {
    uid: string;
    pubKey: string;
    algorithm: string;
}


export class PostProductDetailsRequestService implements RouteService {
    private readonly getEventBus: () => EventBus;


    constructor(options: PostProductDetailsRequestServiceOptions) {
        this.getEventBus = options.getEventBus;
    }


    public async run(inputs: Inputs): Promise<void> {
        const eventBus = this.getEventBus();
        await eventBus.broadcastProductDetailsRequest(inputs);
    }
}