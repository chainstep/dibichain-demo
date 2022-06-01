import { BadRequestError } from "@atz3n/express-utils";
import { randomUUID } from "crypto";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { MyProduct } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface PostMyProductServiceOptions {
    getMyProductStore: () => IMyProductStore;
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Inputs extends Omit<MyProduct, "id" | "uid"> {
    id?: string;
    uid?: string;
}

export class PostMyProductService implements RouteService {
    private readonly getMyProductStore: () => IMyProductStore;


    constructor(options: PostMyProductServiceOptions) {
        this.getMyProductStore = options.getMyProductStore;
    }


    public async run(inputs: Inputs): Promise<void> {
        const myProduct = inputs;
        const myProductStore = this.getMyProductStore();

        if (!myProduct.uid) {
            myProduct.uid = randomUUID();
        }
        if (!myProduct.id) {
            myProduct.id = myProduct.uid;
        }

        const products = await myProductStore.find({ uid: myProduct.uid });
        if (products.length !== 0) {
            throw new BadRequestError("product already exists");
        }

        await myProductStore.upsert(<MyProduct> myProduct);
    }
}