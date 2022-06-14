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
    myProductDetailsRequestStore: IMyProductDetailsRequestStore;
    newProductStore: INewProductStore;
    keyStore: IKeyStore;
}

interface Inputs {
    uid: string;
}


export class PostMyProductDetailsRequestService implements RouteService {
    private readonly crypto: Crypto;
    private readonly operator: Operator;
    private readonly myProductDetailsRequestStore: IMyProductDetailsRequestStore;
    private readonly newProductStore: INewProductStore;
    private readonly keyStore: IKeyStore;


    constructor(options: PostMyProductDetailsRequestServiceOptions) {
        this.myProductDetailsRequestStore = options.myProductDetailsRequestStore;
        this.newProductStore = options.newProductStore;
        this.keyStore = options.keyStore;
        this.crypto = options.crypto;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const key = this.crypto.generateKeyPair();

        const newProducts = await this.newProductStore.find(inputs);
        if (newProducts.length === 0) {
            throw new BadRequestError("new product not found");
        }

        await this.operator.announceProductDetailsRequest({
            algorithm: key.algorithm,
            publicKey: key.publicKey,
            uid: inputs.uid
        });

        await this.myProductDetailsRequestStore.upsert({
            algorithm: key.algorithm,
            publicKey: key.publicKey,
            uid: inputs.uid,
            responded: false,
            timestamp: 0
        });

        await this.keyStore.upsert(key);
    }
}