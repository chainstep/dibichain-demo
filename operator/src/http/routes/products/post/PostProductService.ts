import { EventBus } from "../../../../contract/interfaces/EventBus";
import { Product } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface PostProductServiceOptions {
    getEventBus: () => EventBus
}

type Inputs = Product


export class PostProductService implements RouteService {
    private readonly getEventBus: () => EventBus;


    constructor(options: PostProductServiceOptions) {
        this.getEventBus = options.getEventBus;
    }


    public async run(inputs: Inputs): Promise<void> {
        const eventBus = this.getEventBus();
        await eventBus.broadcastNewProduct({
            uid: inputs.uid,
            Type: inputs.type,
            hash: inputs.hash,
            id: inputs.id,
            name: inputs.name,
            number: inputs.number
        });
    }
}