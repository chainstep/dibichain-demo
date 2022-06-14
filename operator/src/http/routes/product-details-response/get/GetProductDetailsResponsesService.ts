import { IProductDetailsResponseStore, ProductDetailsResponse } from "../../../../storage/product-details-response/IProductDetailsResponseStore";
import { RouteService } from "../../../routerFactory";


export interface GetProductDetailsResponseServiceOptions {
    getProductDetailsResponseStore: () => IProductDetailsResponseStore;
}

interface Inputs {
    publicKeys: string[];
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
        const { publicKeys } = inputs;
        const productDetailsResponseStore = this.getProductDetailsResponseStore();

        let productDetailsResponses = <ProductDetailsResponse[]> [];
        for (let i = 0 ; i < publicKeys.length ; i++) {
            const publicKey = publicKeys[i];
            const _productDetailsResponses = await productDetailsResponseStore.find({ publicKey });
            productDetailsResponses = [...productDetailsResponses, ..._productDetailsResponses];
        }

        return { productDetailsResponses };
    }
}