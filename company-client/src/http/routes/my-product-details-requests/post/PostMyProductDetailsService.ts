import { Crypto } from "../../../../lib/Crypto";
import { Operator } from "../../../../lib/Operator";
import { IMyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { IKeyStore } from "../../../../storage/key/IKeyStore";
import { RouteService } from "../../routerFactory";


export interface PostMyProductDetailsRequestServiceOptions {
    crypto: Crypto;
    operator: Operator;
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    getKeyStore: () => IKeyStore;
}

interface Inputs {
    uid: string;
}


export class PostMyProductDetailsRequestService implements RouteService {
    private readonly crypto: Crypto;
    private readonly operator: Operator;
    private readonly getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    private readonly getKeyStore: () => IKeyStore;


    constructor(options: PostMyProductDetailsRequestServiceOptions) {
        this.getMyProductDetailsRequestStore = options.getMyProductDetailsRequestStore;
        this.getKeyStore = options.getKeyStore;
        this.crypto = options.crypto;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const myProductDetailsRequestStore = this.getMyProductDetailsRequestStore();
        const keyStore = this.getKeyStore();
        const key = this.crypto.generateKeyPair();

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