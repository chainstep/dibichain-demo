import { Event } from "ethers";
import { IMyProductDetailsRequestStore } from "../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { IProductDetailsRequestStore } from "../../../storage/product-details-request/IProductDetailsRequestStore";
import { ProductDetailsRequestEventParams } from "../../../types";
import { logger } from "../../../utils/logger";
import { ContractEventHandlerService } from "../contractEventHandlerFactory";


interface ProductDetailsRequestServiceOptions {
    productDetailsRequestStore: IProductDetailsRequestStore;
    myProductDetailsRequestStore: IMyProductDetailsRequestStore;
}


export class ProductDetailsRequestService implements ContractEventHandlerService {
    private readonly productDetailsRequestStore: IProductDetailsRequestStore;
    private readonly myProductDetailsRequestStore: IMyProductDetailsRequestStore;


    constructor(options: ProductDetailsRequestServiceOptions) {
        this.productDetailsRequestStore = options.productDetailsRequestStore;
        this.myProductDetailsRequestStore = options.myProductDetailsRequestStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const productDetailsRequest = <ProductDetailsRequestEventParams> inputs[1];
        const event = <Event> inputs[2];

        logger.event("ProductDetailsRequest -> uid: " + productDetailsRequest.uid + ", block: " + event.blockNumber,
            { metadata: { uid: productDetailsRequest.uid, blockNumber: event.blockNumber } }
        );

        try {
            const block = await event.getBlock();
            const myProductDetailsRequests = await this.myProductDetailsRequestStore.find({
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
                await this.productDetailsRequestStore.upsert(_productDetailsRequest);
            } else if (myProductDetailsRequests[0].timestamp === 0) {
                await this.myProductDetailsRequestStore.upsert(_productDetailsRequest);
            }
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { uid: productDetailsRequest.uid, blockNumber: event.blockNumber } }
            );
        }
    }
}