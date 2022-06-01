import { IMyNewProductStore } from "../../../../storage/my-new-product/IMyNewProductStore";
import { MyNewProduct } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface GetMyNewProductsServiceOptions {
    getMyNewProductStore: () => IMyNewProductStore;
}


interface Inputs {
    uid?: string
}

interface Outputs {
    myNewProducts: MyNewProduct[];
}


export class GetMyNewProductsService implements RouteService {
    private readonly getMyNewProductStore: () => IMyNewProductStore;


    constructor(options: GetMyNewProductsServiceOptions) {
        this.getMyNewProductStore = options.getMyNewProductStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const myNewProductStore = this.getMyNewProductStore();
        const myNewProducts =await myNewProductStore.find(inputs);
        return { myNewProducts };
    }
}