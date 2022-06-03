import { Operator } from "../../lib/Operator";
import { IKeyStore } from "../../storage/key/IKeyStore";
import { IMyProductDetailsRequestStore } from "../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { INewProductStore } from "../../storage/new-product/INewProductStore";
import { IProductStore } from "../../storage/product/IProductStore";
import { Key } from "../../types";
import { IntervalService } from "../IntervalHandler";


export interface PollProductsServiceOptions {
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    getKeyStore: () => IKeyStore;
    getProductStore: () => IProductStore;
    getNewProductStore: () => INewProductStore;
    operator: Operator;
}


export class PollProductsService implements IntervalService {
    private readonly getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    private readonly getKeyStore: () => IKeyStore;
    private readonly getProductStore: () => IProductStore;
    private readonly getNewProductStore: () => INewProductStore;
    private readonly operator: Operator;


    constructor(options: PollProductsServiceOptions) {
        this.getMyProductDetailsRequestStore = options.getMyProductDetailsRequestStore;
        this.getKeyStore = options.getKeyStore;
        this.getProductStore = options.getProductStore;
        this.getNewProductStore = options.getNewProductStore;
        this.operator = options.operator;
    }


    public async run(): Promise<void> {
        const myProductDetailsRequestStore = this.getMyProductDetailsRequestStore();
        const keyStore = this.getKeyStore();
        const productStore = this.getProductStore();
        const newProductStore = this.getNewProductStore();

        const myProductDetailsRequests = await myProductDetailsRequestStore.find({});
        const notRespondedRequests = myProductDetailsRequests.filter((myProductDetailsRequest) => {
            return !myProductDetailsRequest.responded;
        });

        const params = <{key: Key, hash: string}[]> [];
        for (let i = 0 ; i < notRespondedRequests.length ; i++) {
            const publicKey = notRespondedRequests[i].publicKey;
            const uid = notRespondedRequests[i].uid;

            const key = (await keyStore.find({ publicKey }))[0];
            const hash = (await newProductStore.find({ uid }))[0].hash;

            params.push({ key, hash });
        }

        const products = await this.operator.getProducts(params);
        for (let i = 0 ; i < products.length ; i++) {
            const product = products[i];
            await productStore.upsert(products[i]);

            const respondedRequest = notRespondedRequests.find(request => request.uid === product.uid);
            if (respondedRequest) {
                respondedRequest.responded = true;
                await myProductDetailsRequestStore.upsert(respondedRequest);
            }
        }
    }
}