import { IProductDetailsResponseStore } from "../../../../storage/product-details-response/IProductDetailsResponseStore";
import { ProductDetailsResponse } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface GetProductDetailsResponseServiceOptions {
    productDetailsResponseStore: IProductDetailsResponseStore;
}

interface Inputs {
    publicKeys: string[];
}

interface Outputs {
    productDetailsResponses: ProductDetailsResponse[];
}


export class GetProductDetailsResponseService implements RouteService {
    private readonly productDetailsResponseStore: IProductDetailsResponseStore;


    constructor(options: GetProductDetailsResponseServiceOptions) {
        this.productDetailsResponseStore = options.productDetailsResponseStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const { publicKeys } = inputs;

        let productDetailsResponses = <ProductDetailsResponse[]> [];
        for (let i = 0 ; i < publicKeys.length ; i++) {
            const publicKey = publicKeys[i];
            const _productDetailsResponses = await this.productDetailsResponseStore.find({ publicKey });
            productDetailsResponses = [...productDetailsResponses, ..._productDetailsResponses];
        }

        return { productDetailsResponses };
    }
}