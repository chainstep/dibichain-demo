import { BadRequestError } from "@atz3n/express-utils";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { MyProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
    myProductStore: IMyProductStore;
}


type Inputs = MyProduct

export class PostMyProductService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<void> {
        const products = await this.options.myProductStore.find({ uid: inputs.uid });
        if (products.length !== 0) {
            throw new BadRequestError("product already exists");
        }

        await this.options.myProductStore.upsert(inputs);
    }
}