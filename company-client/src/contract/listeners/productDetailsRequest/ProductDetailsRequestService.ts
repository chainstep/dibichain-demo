import { Event } from "ethers";
import { IProductDetailsRequestStore } from "../../../storage/productDetailsRequest/IProductDetailsRequestStore";
import { ProductDetailsRequestEventParams } from "../../../types";
import { logger } from "../../../utils/logger";
import { ContractEventHandlerService } from "../contractEventHandlerFactory";


interface ProductDetailsRequestServiceOptions {
    getProductDetailsRequestStore: () => IProductDetailsRequestStore;
}


export class ProductDetailsRequestService implements ContractEventHandlerService {
    private readonly getProductDetailsRequestStore: () => IProductDetailsRequestStore;


    constructor(options: ProductDetailsRequestServiceOptions) {
        this.getProductDetailsRequestStore = options.getProductDetailsRequestStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const productDetailsRequestStore = this.getProductDetailsRequestStore();
        const productDetailsRequest = <ProductDetailsRequestEventParams> inputs[1];
        const event = <Event> inputs[2];

        logger.event("ProductDetailsRequest -> uid: " + productDetailsRequest.uid + ", block: " + event.blockNumber,
            { metadata: { uid: productDetailsRequest.uid, blockNumber: event.blockNumber } }
        );

        try {
            const block = await event.getBlock();
            await productDetailsRequestStore.add({
                algorithm: productDetailsRequest.algorithm,
                pubKey: productDetailsRequest.pubKey,
                uid: productDetailsRequest.uid,
                timestamp: block.timestamp
            });
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { uid: productDetailsRequest.uid, blockNumber: event.blockNumber } }
            );
        }
    }
}