import { IMyNewProductStore } from "../../../../storage/my-new-product/IMyNewProductStore";
import { MyNewProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface ServiceOptions {
    myNewProductStore: IMyNewProductStore;
}


interface Inputs {
    uid?: string
}

interface Outputs {
    myNewProducts: MyNewProduct[];
}


export class GetMyNewProductsService implements RouteService {
    constructor(private readonly options: ServiceOptions) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const myNewProducts =await this.options.myNewProductStore.find(inputs);
        return { myNewProducts };
    }
}