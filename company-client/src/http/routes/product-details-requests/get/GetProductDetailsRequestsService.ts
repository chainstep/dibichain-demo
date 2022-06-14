import { IProductDetailsRequestStore } from "../../../../storage/product-details-request/IProductDetailsRequestStore";
import { ProductDetailsRequest } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface GetProductDetailsRequestsServiceOptions {
    getProductDetailsRequestStore: () => IProductDetailsRequestStore;
}


interface Outputs {
    productDetailsRequests: ProductDetailsRequest[];
}

interface Inputs {
    uid?: string
}


export class GetProductDetailsRequestsService implements RouteService {
    private readonly getProductDetailsRequestStore: () => IProductDetailsRequestStore;


    constructor(options: GetProductDetailsRequestsServiceOptions) {
        this.getProductDetailsRequestStore = options.getProductDetailsRequestStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const productDetailsRequestStore = this.getProductDetailsRequestStore();

        const productDetailsRequests = await productDetailsRequestStore.find(inputs);
        return { productDetailsRequests };
    }
}