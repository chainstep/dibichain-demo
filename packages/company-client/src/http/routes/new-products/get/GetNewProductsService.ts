import { INewProductStore } from "../../../../storage/new-product/INewProductStore";
import { NewProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
    newProductStore: INewProductStore;
}


interface Inputs {
    uid?: string
}

interface Outputs {
    newProducts: NewProduct[];
}


export class GetNewProductsService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const newProducts = await this.options.newProductStore.find(inputs);
        return { newProducts };
    }
}