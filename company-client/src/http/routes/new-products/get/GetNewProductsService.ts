import { INewProductStore } from "../../../../storage/new-product/INewProductStore";
import { NewProduct } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface GetNewProductsServiceOptions {
    getNewProductStore: () => INewProductStore;
}


interface Inputs {
    uid?: string
}

interface Outputs {
    newProducts: NewProduct[];
}


export class GetNewProductsService implements RouteService {
    private readonly getNewProductStore: () => INewProductStore;


    constructor(options: GetNewProductsServiceOptions) {
        this.getNewProductStore = options.getNewProductStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const newProductStore = this.getNewProductStore();
        const newProducts =await newProductStore.find(inputs);
        return { newProducts };
    }
}