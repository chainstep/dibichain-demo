import { IMyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { MyProductDetailsRequest } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface GetMyProductDetailsRequestsServiceOptions {
    myProductDetailsRequestStore: IMyProductDetailsRequestStore;
}


interface Outputs {
    myProductDetailsRequests: MyProductDetailsRequest[];
}

interface Inputs {
    uid?: string
}


export class GetMyProductDetailsRequestsService implements RouteService {
    private readonly myProductDetailsRequestStore: IMyProductDetailsRequestStore;


    constructor(options: GetMyProductDetailsRequestsServiceOptions) {
        this.myProductDetailsRequestStore = options.myProductDetailsRequestStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const myProductDetailsRequests = await this.myProductDetailsRequestStore.find(inputs);
        return { myProductDetailsRequests };
    }
}