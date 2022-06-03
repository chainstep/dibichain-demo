import { Operator } from "../../lib/Operator";
import { IKeyStore } from "../../storage/key/IKeyStore";
import { IMyProductDetailsRequestStore } from "../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { IProductStore } from "../../storage/product/IProductStore";
import { Key } from "../../types";
import { IntervalService } from "../IntervalHandler";


export interface PollProductsServiceOptions {
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    getKeyStore: () => IKeyStore;
    getProductStore: () => IProductStore;
    operator: Operator;
}


export class PollProductsService implements IntervalService {
    private readonly getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    private readonly getKeyStore: () => IKeyStore;
    private readonly getProductStore: () => IProductStore;
    private readonly operator: Operator;


    constructor(options: PollProductsServiceOptions) {
        this.getMyProductDetailsRequestStore = options.getMyProductDetailsRequestStore;
        this.getKeyStore = options.getKeyStore;
        this.getProductStore = options.getProductStore;
        this.operator = options.operator;
    }


    public async run(): Promise<void> {
        const myProductDetailsRequestStore = this.getMyProductDetailsRequestStore();
        const keyStore = this.getKeyStore();
        const productStore = this.getProductStore();

        const myProductDetailsRequests = await myProductDetailsRequestStore.find({});
        const notRespondedRequests = myProductDetailsRequests.filter((myProductDetailsRequest) => {
            return !myProductDetailsRequest.responded;
        });

        const keys = <Key[]> [];
        for (let i = 0 ; i < notRespondedRequests.length ; i++) {
            const publicKey = notRespondedRequests[i].publicKey;
            const key = (await keyStore.find({ publicKey }))[0];
            keys.push(key);
        }

        const products = await this.operator.getProducts(keys);
        for (let i = 0 ; i < products.length ; i++) {
            await productStore.upsert(products[i]);
        }
    }
}