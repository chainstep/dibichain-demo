import { IMyNewProductStore } from "../../../../storage/my-new-product/IMyNewProductStore";
import { MyNewProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface GetMyNewProductsServiceOptions {
    myNewProductStore: IMyNewProductStore;
}


interface Inputs {
    uid?: string
}

interface Outputs {
    myNewProducts: MyNewProduct[];
}


export class GetMyNewProductsService implements RouteService {
    private readonly myNewProductStore: IMyNewProductStore;


    constructor(options: GetMyNewProductsServiceOptions) {
        this.myNewProductStore = options.myNewProductStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const myNewProducts =await this.myNewProductStore.find(inputs);
        return { myNewProducts };
    }
}