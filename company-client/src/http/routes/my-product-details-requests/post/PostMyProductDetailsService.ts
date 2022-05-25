import { Crypto } from "../../../../lib/Crypto";
import { Operator } from "../../../../lib/Operator";
import { IMyProductDetailsRequestStore } from "../../../../storage/myProductDetailsRequest/IMyProductDetailsRequestStore";
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
        const key = this.crypto.generateKey();

        await myProductDetailsRequestStore.add({
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