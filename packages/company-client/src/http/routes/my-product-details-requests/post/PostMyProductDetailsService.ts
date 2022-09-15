import { Crypto } from "../../../../lib/Crypto";
import { Operator } from "../../../../lib/Operator";
import { IMyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { IKeyStore } from "../../../../storage/key/IKeyStore";
import { RouteService } from "../../../routerFactory";
import { INewProductStore } from "../../../../storage/new-product/INewProductStore";
import { BadRequestError } from "@atz3n/express-utils";


export interface ServiceOptions {
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
    constructor(private readonly options: ServiceOptions) {}


    public async run(inputs: Inputs): Promise<void> {
        const key = this.options.crypto.generateKeyPair();

        const newProducts = await this.options.newProductStore.find(inputs);
        if (newProducts.length === 0) {
            throw new BadRequestError("new product not found");
        }

        await this.options.operator.announceProductDetailsRequest({
            algorithm: key.algorithm,
            publicKey: key.publicKey,
            uid: inputs.uid
        });

        await this.options.myProductDetailsRequestStore.upsert({
            algorithm: key.algorithm,
            publicKey: key.publicKey,
            uid: inputs.uid,
            responded: false,
            timestamp: 0
        });

        await this.options.keyStore.upsert(key);
    }
}