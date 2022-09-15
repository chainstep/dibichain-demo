import { IProductStore } from "../../../../storage/product/IProductStore";
import { Product } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface ServiceOptions {
    productStore: IProductStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    products: Product[];
}

export class GetProductsService implements RouteService {
    constructor(private readonly options: ServiceOptions) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const products = await this.options.productStore.find(inputs);
        return { products };
    }
}