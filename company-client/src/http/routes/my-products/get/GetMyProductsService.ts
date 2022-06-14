import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { MyProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface GetMyProductsServiceOptions {
    myProductStore: IMyProductStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    myProducts: MyProduct[];
}


export class GetMyProductsService implements RouteService {
    private readonly myProductStore: IMyProductStore;


    constructor(options: GetMyProductsServiceOptions) {
        this.myProductStore = options.myProductStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const myProducts = await this.myProductStore.find(inputs);
        return { myProducts };
    }
}