import { Event } from "ethers";
import { IMyProductDetailsRequestStore } from "../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { IProductDetailsRequestStore } from "../../../storage/product-details-request/IProductDetailsRequestStore";
import { ProductDetailsRequestEventParams } from "../../../types";
import { logger } from "../../../utils/logger";
import { ContractEventHandlerService } from "../contractEventHandlerFactory";


interface ProductDetailsRequestServiceOptions {
    getProductDetailsRequestStore: () => IProductDetailsRequestStore;
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
}


export class ProductDetailsRequestService implements ContractEventHandlerService {
    private readonly getProductDetailsRequestStore: () => IProductDetailsRequestStore;
    private readonly getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;


    constructor(options: ProductDetailsRequestServiceOptions) {
        this.getProductDetailsRequestStore = options.getProductDetailsRequestStore;
        this.getMyProductDetailsRequestStore = options.getMyProductDetailsRequestStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const productDetailsRequestStore = this.getProductDetailsRequestStore();
        const myProductDetailsRequestStore = this.getMyProductDetailsRequestStore();

        const productDetailsRequest = <ProductDetailsRequestEventParams> inputs[1];
        const event = <Event> inputs[2];

        logger.event("ProductDetailsRequest -> uid: " + productDetailsRequest.uid + ", block: " + event.blockNumber,
            { metadata: { uid: productDetailsRequest.uid, blockNumber: event.blockNumber } }
        );

        try {
            const block = await event.getBlock();
            const myProductDetailsRequests = await myProductDetailsRequestStore.find({
                uid: productDetailsRequest.uid
            });
            const _productDetailsRequest = {
                algorithm: productDetailsRequest.algorithm,
                publicKey: productDetailsRequest.publicKey,
                uid: productDetailsRequest.uid,
                timestamp: block.timestamp,
                responded: false
            };

            if (myProductDetailsRequests.length === 0) {
                await productDetailsRequestStore.upsert(_productDetailsRequest);
            } else if (myProductDetailsRequests[0].timestamp === 0) {
                await myProductDetailsRequestStore.upsert(_productDetailsRequest);
            }
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { uid: productDetailsRequest.uid, blockNumber: event.blockNumber } }
            );
        }
    }
}