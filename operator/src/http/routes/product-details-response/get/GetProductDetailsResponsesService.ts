import { IProductDetailsResponseStore, ProductDetailsResponse } from "../../../../storage/product-details-response/IProductDetailsResponseStore";
import { RouteService } from "../../routerFactory";


export interface GetProductDetailsResponseServiceOptions {
    getProductDetailsResponseStore: () => IProductDetailsResponseStore;
}

interface Inputs {
    uid: string;
    publicKey: string;
}

interface Outputs {
    productDetailsResponses: ProductDetailsResponse[];
}


export class GetProductDetailsResponseService implements RouteService {
    private readonly getProductDetailsResponseStore: () => IProductDetailsResponseStore;


    constructor(options: GetProductDetailsResponseServiceOptions) {
        this.getProductDetailsResponseStore = options.getProductDetailsResponseStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const productDetailsResponseStore = this.getProductDetailsResponseStore();
        const productDetailsResponses = await productDetailsResponseStore.find(inputs);
        return { productDetailsResponses };
    }
}