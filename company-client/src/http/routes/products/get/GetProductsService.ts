import { IProductStore } from "../../../../storage/product/IProductStore";
import { ResponseProduct } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface GetProductsServiceOptions {
    getProductStore: () => IProductStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    products: ResponseProduct[];
}

export class GetProductsService implements RouteService {
    private readonly getProductStore: () => IProductStore;


    constructor(options: GetProductsServiceOptions) {
        this.getProductStore = options.getProductStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const { uid } = inputs;
        const productStore = this.getProductStore();

        const products = (await productStore.find({ uid })).map((product) => {
            const _product = <ResponseProduct> product;
            _product.amount = "" + product.amount;
            _product.weight = "" + product.weight;
            _product.carbonFootprint = "" + product.carbonFootprint;
            return _product;
        });
        return { products };
    }
}