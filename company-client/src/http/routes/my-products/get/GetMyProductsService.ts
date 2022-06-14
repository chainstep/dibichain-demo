import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { MyProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface GetMyProductsServiceOptions {
    getMyProductStore: () => IMyProductStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    myProducts: MyProduct[];
}

export class GetMyProductsService implements RouteService {
    private readonly getMyProductStore: () => IMyProductStore;


    constructor(options: GetMyProductsServiceOptions) {
        this.getMyProductStore = options.getMyProductStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const myProductStore = this.getMyProductStore();

        const myProducts = await myProductStore.find(inputs);
        return { myProducts };
    }
}