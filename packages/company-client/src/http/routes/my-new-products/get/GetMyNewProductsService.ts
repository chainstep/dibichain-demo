import { IMyNewProductStore } from "../../../../storage/my-new-product/IMyNewProductStore";
import { MyNewProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
    myNewProductStore: IMyNewProductStore;
}


interface Inputs {
    uid?: string
}

interface Outputs {
    myNewProducts: MyNewProduct[];
}


export class GetMyNewProductsService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const myNewProducts =await this.options.myNewProductStore.find(inputs);
        return { myNewProducts };
    }
}