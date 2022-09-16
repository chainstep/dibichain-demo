import { IProductDetailsRequestStore } from "../../../../storage/product-details-request/IProductDetailsRequestStore";
import { ProductDetailsRequest } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
    productDetailsRequestStore: IProductDetailsRequestStore;
}


interface Outputs {
    productDetailsRequests: ProductDetailsRequest[];
}

interface Inputs {
    uid?: string
}


export class GetProductDetailsRequestsService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const productDetailsRequests = await this.options.productDetailsRequestStore.find(inputs);
        return { productDetailsRequests };
    }
}