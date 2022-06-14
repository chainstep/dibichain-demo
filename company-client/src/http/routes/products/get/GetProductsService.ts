import { IProductStore } from "../../../../storage/product/IProductStore";
import { Product } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface GetProductsServiceOptions {
    getProductStore: () => IProductStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    products: Product[];
}

export class GetProductsService implements RouteService {
    private readonly getProductStore: () => IProductStore;


    constructor(options: GetProductsServiceOptions) {
        this.getProductStore = options.getProductStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const productStore = this.getProductStore();

        const products = await productStore.find(inputs);
        return { products };
    }
}