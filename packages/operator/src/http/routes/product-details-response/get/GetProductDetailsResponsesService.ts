import { IProductDetailsResponseStore } from "../../../../storage/product-details-response/IProductDetailsResponseStore";
import { ProductDetailsResponse } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
    productDetailsResponseStore: IProductDetailsResponseStore;
}

interface Inputs {
    publicKeys: string[];
}

interface Outputs {
    productDetailsResponses: ProductDetailsResponse[];
}


export class GetProductDetailsResponseService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const { publicKeys } = inputs;

        let productDetailsResponses = <ProductDetailsResponse[]> [];
        for (let i = 0 ; i < publicKeys.length ; i++) {
            const publicKey = publicKeys[i];
            const _productDetailsResponses = await this.options.productDetailsResponseStore.find({ publicKey });
            productDetailsResponses = [...productDetailsResponses, ..._productDetailsResponses];
        }

        return { productDetailsResponses };
    }
}