import { EventBus } from "../../../../contract/interfaces/EventBus";
import { NewProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface PostNewProductServiceOptions {
    eventBus: EventBus
}

type Inputs = NewProduct


export class PostNewProductService implements RouteService {
    private readonly eventBus: EventBus;


    constructor(options: PostNewProductServiceOptions) {
        this.eventBus = options.eventBus;
    }


    public async run(inputs: Inputs): Promise<void> {
        await this.eventBus.broadcastNewProduct({
            uid: inputs.uid,
            Type: inputs.type,
            hash: inputs.hash,
            id: inputs.id,
            name: inputs.name,
            number: inputs.number
        });
    }
}