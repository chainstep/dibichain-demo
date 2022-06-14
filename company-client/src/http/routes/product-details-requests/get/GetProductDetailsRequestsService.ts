import { IProductDetailsRequestStore } from "../../../../storage/product-details-request/IProductDetailsRequestStore";
import { ProductDetailsRequest } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface GetProductDetailsRequestsServiceOptions {
    productDetailsRequestStore: IProductDetailsRequestStore;
}


interface Outputs {
    productDetailsRequests: ProductDetailsRequest[];
}

interface Inputs {
    uid?: string
}


export class GetProductDetailsRequestsService implements RouteService {
    private readonly productDetailsRequestStore: IProductDetailsRequestStore;


    constructor(options: GetProductDetailsRequestsServiceOptions) {
        this.productDetailsRequestStore = options.productDetailsRequestStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const productDetailsRequests = await this.productDetailsRequestStore.find(inputs);
        return { productDetailsRequests };
    }
}