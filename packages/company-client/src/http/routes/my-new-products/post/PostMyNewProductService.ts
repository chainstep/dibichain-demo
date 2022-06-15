import { BadRequestError } from "@atz3n/express-utils";
import { Operator } from "../../../../lib/Operator";
import { IMyNewProductStore } from "../../../../storage/my-new-product/IMyNewProductStore";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { RouteService } from "../../../routerFactory";


export interface PostMyNewProductServiceOptions {
    myProductStore: IMyProductStore;
    myNewProductStore: IMyNewProductStore;
    operator: Operator;
}

interface Inputs {
    uid: string;
}


export class PostMyNewProductService implements RouteService {
    private readonly myProductStore: IMyProductStore;
    private readonly myNewProductStore: IMyNewProductStore;
    private readonly operator: Operator;


    constructor(options: PostMyNewProductServiceOptions) {
        this.myProductStore = options.myProductStore;
        this.myNewProductStore = options.myNewProductStore;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const myProducts = await this.myProductStore.find(inputs);
        if (myProducts.length === 0) {
            throw new BadRequestError("product not found");
        }

        const myNewProduct = await this.operator.announceNewProduct(myProducts[0]);
        await this.myNewProductStore.upsert(myNewProduct);
    }
}