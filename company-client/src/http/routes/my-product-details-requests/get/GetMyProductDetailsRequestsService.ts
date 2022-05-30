import { IMyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { ProductDetailsRequest } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface GetMyProductDetailsRequestsServiceOptions {
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
}


interface Outputs {
    productDetailsRequests: ProductDetailsRequest[];
}

interface Inputs {
    uid?: string
}


export class GetMyProductDetailsRequestsService implements RouteService {
    private readonly getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;


    constructor(options: GetMyProductDetailsRequestsServiceOptions) {
        this.getMyProductDetailsRequestStore = options.getMyProductDetailsRequestStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const myProductDetailsRequestStore = this.getMyProductDetailsRequestStore();
        const productDetailsRequests = (await myProductDetailsRequestStore.find(inputs)).map((request) => {
            return <ProductDetailsRequest> {
                algorithm: request.algorithm,
                pubKey: request.pubKey,
                timestamp: request.timestamp,
                uid: request.uid
            };
        });
        return { productDetailsRequests };
    }
}