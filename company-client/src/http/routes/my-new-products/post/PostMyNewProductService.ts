import { BadRequestError } from "@atz3n/express-utils";
import { Operator } from "../../../../lib/Operator";
import { IMyNewProductStore } from "../../../../storage/my-new-product/IMyNewProductStore";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { RouteService } from "../../routerFactory";


export interface PostMyNewProductServiceOptions {
    getMyProductStore: () => IMyProductStore;
    getMyNewProductStore: () => IMyNewProductStore;
    operator: Operator;
}

interface Inputs {
    uid: string;
}


export class PostMyNewProductService implements RouteService {
    private readonly getMyProductStore: () => IMyProductStore;
    private readonly getMyNewProductStore: () => IMyNewProductStore;
    private readonly operator: Operator;


    constructor(options: PostMyNewProductServiceOptions) {
        this.getMyProductStore = options.getMyProductStore;
        this.getMyNewProductStore = options.getMyNewProductStore;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const myNewProductStore = this.getMyNewProductStore();
        const myProductStore = this.getMyProductStore();
        const myProducts = await myProductStore.find(inputs);
        if (myProducts.length === 0) {
            throw new BadRequestError("product not found");
        }

        const myNewProduct = await this.operator.announceNewProduct(myProducts[0]);
        await myNewProductStore.upsert(myNewProduct);
    }
}