import { BadRequestError } from "@atz3n/express-utils";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { MyProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface PostMyProductServiceOptions {
    myProductStore: IMyProductStore;
}


type Inputs = MyProduct

export class PostMyProductService implements RouteService {
    private readonly myProductStore: IMyProductStore;


    constructor(options: PostMyProductServiceOptions) {
        this.myProductStore = options.myProductStore;
    }


    public async run(inputs: Inputs): Promise<void> {
        const products = await this.myProductStore.find({ uid: inputs.uid });
        if (products.length !== 0) {
            throw new BadRequestError("product already exists");
        }

        await this.myProductStore.upsert(inputs);
    }
}