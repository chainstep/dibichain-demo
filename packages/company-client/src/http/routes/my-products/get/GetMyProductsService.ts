import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { MyProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
    myProductStore: IMyProductStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    myProducts: MyProduct[];
}


export class GetMyProductsService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const myProducts = await this.options.myProductStore.find(inputs);
        return { myProducts };
    }
}