import { Crypto } from "../../../../lib/Crypto";
import { Operator } from "../../../../lib/Operator";
import { IProductDetailsRequestStore } from "../../../../storage/productDetailsRequest/IProductDetailsRequestStore";
import { RouteService } from "../../routerFactory";


export interface PostProductDetailsRequestServiceOptions {
    getProductDetailsRequestStore: () => IProductDetailsRequestStore;
    crypto: Crypto;
    operator: Operator;
}

interface Inputs {
    uid: string;
}


export class PostProductDetailsRequestService implements RouteService {
    private readonly getProductDetailsRequestStore: () => IProductDetailsRequestStore;
    private readonly crypto: Crypto;
    private readonly operator: Operator;


    constructor(options: PostProductDetailsRequestServiceOptions) {
        this.getProductDetailsRequestStore = options.getProductDetailsRequestStore;
        this.crypto = options.crypto;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const productDetailsRequestStore = this.getProductDetailsRequestStore();
        const key = this.crypto.generateKey();

        await productDetailsRequestStore.add({
            algorithm: key.algorithm,
            privKey: key.privKey,
            pubKey: key.pubKey,
            uid: inputs.uid
        });

        await this.operator.announceProductDetailsRequest({
            algorithm: key.algorithm,
            pubKey: key.pubKey,
            uid: inputs.uid
        });
    }
}