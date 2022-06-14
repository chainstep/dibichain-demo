import { EventBus } from "../../../../contract/interfaces/EventBus";
import { RouteService } from "../../../routerFactory";


export interface PostProductDetailsRequestServiceOptions {
    eventBus: EventBus;
}

interface Inputs {
    uid: string;
    publicKey: string;
    algorithm: string;
}


export class PostProductDetailsRequestService implements RouteService {
    private readonly eventBus: EventBus;


    constructor(options: PostProductDetailsRequestServiceOptions) {
        this.eventBus = options.eventBus;
    }


    public async run(inputs: Inputs): Promise<void> {
        await this.eventBus.broadcastProductDetailsRequest(inputs);
    }
}