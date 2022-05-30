import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { ResponseProduct } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface GetMyProductsServiceOptions {
    getMyProductStore: () => IMyProductStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    myProducts: ResponseProduct[];
}

export class GetMyProductsService implements RouteService {
    private readonly getMyProductStore: () => IMyProductStore;


    constructor(options: GetMyProductsServiceOptions) {
        this.getMyProductStore = options.getMyProductStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const { uid } = inputs;
        const myProductStore = this.getMyProductStore();

        const myProducts = (await myProductStore.find({ uid })).map((product) => {
            const _product = <ResponseProduct> product;
            _product.amount = "" + product.amount;
            _product.weight = "" + product.weight;
            _product.carbonFootprint = "" + product.carbonFootprint;
            return _product;
        });
        return { myProducts };
    }
}