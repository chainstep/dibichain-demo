import { Crypto } from "../../../../lib/Crypto";
import { Operator } from "../../../../lib/Operator";
import { IMyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { IKeyStore } from "../../../../storage/key/IKeyStore";
import { RouteService } from "../../../routerFactory";
import { INewProductStore } from "../../../../storage/new-product/INewProductStore";
import { BadRequestError } from "@atz3n/express-utils";


export interface PostMyProductDetailsRequestServiceOptions {
    crypto: Crypto;
    operator: Operator;
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    getNewProductStore: () => INewProductStore;
    getKeyStore: () => IKeyStore;
}

interface Inputs {
    uid: string;
}


export class PostMyProductDetailsRequestService implements RouteService {
    private readonly crypto: Crypto;
    private readonly operator: Operator;
    private readonly getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    private readonly getNewProductStore: () => INewProductStore;
    private readonly getKeyStore: () => IKeyStore;


    constructor(options: PostMyProductDetailsRequestServiceOptions) {
        this.getMyProductDetailsRequestStore = options.getMyProductDetailsRequestStore;
        this.getNewProductStore = options.getNewProductStore;
        this.getKeyStore = options.getKeyStore;
        this.crypto = options.crypto;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const myProductDetailsRequestStore = this.getMyProductDetailsRequestStore();
        const newProductStore = this.getNewProductStore();
        const keyStore = this.getKeyStore();
        const key = this.crypto.generateKeyPair();

        const newProducts = await newProductStore.find(inputs);
        if (newProducts.length === 0) {
            throw new BadRequestError("new product not found");
        }

        await this.operator.announceProductDetailsRequest({
            algorithm: key.algorithm,
            publicKey: key.publicKey,
            uid: inputs.uid
        });

        await myProductDetailsRequestStore.upsert({
            algorithm: key.algorithm,
            publicKey: key.publicKey,
            uid: inputs.uid,
            responded: false,
            timestamp: 0
        });

        await keyStore.upsert(key);
    }
}