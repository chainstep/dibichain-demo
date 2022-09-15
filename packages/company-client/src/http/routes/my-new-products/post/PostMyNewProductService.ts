import { BadRequestError } from "@atz3n/express-utils";
import { Operator } from "../../../../lib/Operator";
import { IMyNewProductStore } from "../../../../storage/my-new-product/IMyNewProductStore";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { RouteService } from "../../../routerFactory";


export interface ServiceOptions {
    myProductStore: IMyProductStore;
    myNewProductStore: IMyNewProductStore;
    operator: Operator;
}

interface Inputs {
    uid: string;
}


export class PostMyNewProductService implements RouteService {
    constructor(private readonly options: ServiceOptions) {}


    public async run(inputs: Inputs): Promise<void> {
        const myProducts = await this.options.myProductStore.find(inputs);
        if (myProducts.length === 0) {
            throw new BadRequestError("product not found");
        }

        const myNewProduct = await this.options.operator.announceNewProduct(myProducts[0]);
        await this.options.myNewProductStore.upsert(myNewProduct);
    }
}