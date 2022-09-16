import { EventBus } from "../../../../contract/interfaces/EventBus";
import { NewProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
    eventBus: EventBus
}

type Inputs = NewProduct


export class PostNewProductService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<void> {
        await this.options.eventBus.broadcastNewProduct({
            uid: inputs.uid,
            Type: inputs.type,
            hash: inputs.hash,
            id: inputs.id,
            name: inputs.name,
            number: inputs.number
        });
    }
}