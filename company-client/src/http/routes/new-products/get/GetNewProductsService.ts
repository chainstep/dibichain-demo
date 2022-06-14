import { INewProductStore } from "../../../../storage/new-product/INewProductStore";
import { NewProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface GetNewProductsServiceOptions {
    newProductStore: INewProductStore;
}


interface Inputs {
    uid?: string
}

interface Outputs {
    newProducts: NewProduct[];
}


export class GetNewProductsService implements RouteService {
    private readonly newProductStore: INewProductStore;


    constructor(options: GetNewProductsServiceOptions) {
        this.newProductStore = options.newProductStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const newProducts = await this.newProductStore.find(inputs);
        return { newProducts };
    }
}