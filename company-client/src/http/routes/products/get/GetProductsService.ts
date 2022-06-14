import { IProductStore } from "../../../../storage/product/IProductStore";
import { Product } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface GetProductsServiceOptions {
    productStore: IProductStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    products: Product[];
}

export class GetProductsService implements RouteService {
    private readonly productStore: IProductStore;


    constructor(options: GetProductsServiceOptions) {
        this.productStore = options.productStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const products = await this.productStore.find(inputs);
        return { products };
    }
}