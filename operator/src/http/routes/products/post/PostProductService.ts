import { Product } from "../../../../types";
import { RouteService } from "../../routerFactory";


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PostProductServiceOptions {
}


interface Inputs extends Omit<Product, "id" | "uid"> {
    id?: string;
    uid?: string;
}

export class PostProductService implements RouteService {

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(options: PostProductServiceOptions) {
    }


    public async run(inputs: Inputs): Promise<void> {
        const product = inputs;
        console.log(product);
    }
}