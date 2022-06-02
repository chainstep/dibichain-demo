import { EventBus } from "../../../../contract/interfaces/EventBus";
import { NewProduct } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface PostNewProductServiceOptions {
    getEventBus: () => EventBus
}

type Inputs = NewProduct


export class PostNewProductService implements RouteService {
    private readonly getEventBus: () => EventBus;


    constructor(options: PostNewProductServiceOptions) {
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