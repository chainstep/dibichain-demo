import { BadRequestError } from "@atz3n/express-utils";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { MyProduct } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface PostMyProductServiceOptions {
    getMyProductStore: () => IMyProductStore;
}


type Inputs = MyProduct

export class PostMyProductService implements RouteService {
    private readonly getMyProductStore: () => IMyProductStore;


    constructor(options: PostMyProductServiceOptions) {
        this.getMyProductStore = options.getMyProductStore;
    }


    public async run(inputs: Inputs): Promise<void> {
        const myProductStore = this.getMyProductStore();

        const products = await myProductStore.find({ uid: inputs.uid });
        if (products.length !== 0) {
            throw new BadRequestError("product already exists");
        }

        await myProductStore.upsert(inputs);
    }
}