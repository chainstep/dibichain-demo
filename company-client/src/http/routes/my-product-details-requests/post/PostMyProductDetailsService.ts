import { Crypto } from "../../../../lib/Crypto";
import { Operator } from "../../../../lib/Operator";
import { IMyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { RouteService } from "../../routerFactory";


export interface PostMyProductDetailsRequestServiceOptions {
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    crypto: Crypto;
    operator: Operator;
}

interface Inputs {
    uid: string;
}


export class PostMyProductDetailsRequestService implements RouteService {
    private readonly getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    private readonly crypto: Crypto;
    private readonly operator: Operator;


    constructor(options: PostMyProductDetailsRequestServiceOptions) {
        this.getMyProductDetailsRequestStore = options.getMyProductDetailsRequestStore;
        this.crypto = options.crypto;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const myProductDetailsRequestStore = this.getMyProductDetailsRequestStore();
        const key = this.crypto.generateKeyPair();

        await myProductDetailsRequestStore.add({
            algorithm: key.algorithm,
            privateKey: key.privateKey,
            publicKey: key.publicKey,
            uid: inputs.uid,
            timestamp: 0
        });

        await this.operator.announceProductDetailsRequest({
            algorithm: key.algorithm,
            publicKey: key.publicKey,
            uid: inputs.uid
        });
    }
}