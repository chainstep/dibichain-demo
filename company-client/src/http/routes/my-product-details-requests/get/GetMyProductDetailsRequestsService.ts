import { IMyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { MyProductDetailsRequest } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface GetMyProductDetailsRequestsServiceOptions {
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
}


interface Outputs {
    myProductDetailsRequests: MyProductDetailsRequest[];
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
        const myProductDetailsRequests = await myProductDetailsRequestStore.find(inputs);
        return { myProductDetailsRequests };
    }
}