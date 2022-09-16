import { IMyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { MyProductDetailsRequest } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
    myProductDetailsRequestStore: IMyProductDetailsRequestStore;
}


interface Outputs {
    myProductDetailsRequests: MyProductDetailsRequest[];
}

interface Inputs {
    uid?: string
}


export class GetMyProductDetailsRequestsService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const myProductDetailsRequests = await this.options.myProductDetailsRequestStore.find(inputs);
        return { myProductDetailsRequests };
    }
}