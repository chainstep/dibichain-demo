import { BadRequestError } from "@atz3n/express-utils";
import { randomUUID } from "crypto";
import { IProductStore } from "../../../../storage/product/IProductStore";
import { Product } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface PostProductServiceOptions {
    getProductStore: () => IProductStore;
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Inputs extends Omit<Product, "id" | "uid"> {
    id?: string;
    uid?: string;
}

export class PostProductService implements RouteService {
    private readonly getProductStore: () => IProductStore;


    constructor(options: PostProductServiceOptions) {
        this.getProductStore = options.getProductStore;
    }


    public async run(inputs: Inputs): Promise<void> {
        const product = inputs;
        const productStore = this.getProductStore();

        if (!product.uid) {
            product.uid = randomUUID();
        }
        if (!product.id) {
            product.id = product.uid;
        }

        const products = await productStore.find({ uid: product.uid });
        if (products.length !== 0) {
            throw new BadRequestError("product already exists");
        }
        await productStore.add(<Product> product);
    }
}