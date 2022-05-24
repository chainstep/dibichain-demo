import { INewProductStore } from "../../../../storage/newProduct/INewProductStore";
import { NewProduct } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface GetNewProductsServiceOptions {
    getNewProductStore: () => INewProductStore;
}

interface Outputs {
    newProducts: NewProduct[];
}


export class GetNewProductsService implements RouteService {
    private readonly getNewProductStore: () => INewProductStore;


    constructor(options: GetNewProductsServiceOptions) {
        this.getNewProductStore = options.getNewProductStore;
    }


    public async run(): Promise<Outputs> {
        const newProductStore = this.getNewProductStore();
        const newProducts =await newProductStore.find({});
        return { newProducts };
    }
}