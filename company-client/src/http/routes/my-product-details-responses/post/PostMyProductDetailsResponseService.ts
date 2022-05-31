import { NotFoundError } from "@atz3n/express-utils";
import { Operator } from "../../../../lib/Operator";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { IProductDetailsRequestStore } from "../../../../storage/product-details-request/IProductDetailsRequestStore";
import { RouteService } from "../../routerFactory";


export interface PostMyProductDetailsResponseServiceOptions {
    getProductDetailsRequestStore: () => IProductDetailsRequestStore;
    getMyProductStore: () => IMyProductStore;
    operator: Operator;
}

interface Inputs {
    uid: string;
}


export class PostMyProductDetailsResponseService implements RouteService {
    private readonly getProductDetailsRequestStore: () => IProductDetailsRequestStore;
    private readonly getMyProductStore: () => IMyProductStore;
    private readonly operator: Operator;


    constructor(options: PostMyProductDetailsResponseServiceOptions) {
        this.getProductDetailsRequestStore = options.getProductDetailsRequestStore;
        this.getMyProductStore = options.getMyProductStore;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const productDetailsRequestStore = this.getProductDetailsRequestStore();
        const myProductStore = this.getMyProductStore();

        const myProducts = await myProductStore.find(inputs);
        if (myProducts.length === 0) {
            throw new NotFoundError("product not found");
        }

        const productDetailsRequests = await productDetailsRequestStore.find(inputs);
        if (productDetailsRequests.length === 0) {
            throw new NotFoundError("product details request not found");
        }

        await this.operator.sendProductDetailsResponse({
            product: myProducts[0],
            publicKey: productDetailsRequests[0].publicKey,
            algorithm: productDetailsRequests[0].algorithm
        });

        productDetailsRequests[0].responded = true;
        await productDetailsRequestStore.upsert(productDetailsRequests[0]);
    }
}