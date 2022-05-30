import { Event } from "ethers";
import { INewProductStore } from "../../../storage/new-product/INewProductStore";
import { NewProductEventParams } from "../../../types";
import { logger } from "../../../utils/logger";
import { ContractEventHandlerService } from "../contractEventHandlerFactory";


interface NewProductServiceOptions {
    getNewProductStore: () => INewProductStore;
}


export class NewProductService implements ContractEventHandlerService {
    private readonly getNewProductStore: () => INewProductStore;


    constructor(options: NewProductServiceOptions) {
        this.getNewProductStore = options.getNewProductStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const newProductStore = this.getNewProductStore();
        const newProduct = <NewProductEventParams> inputs[1];
        const event = <Event> inputs[2];

        logger.event("NewProduct -> uid: " + newProduct.uid + ", block: " + event.blockNumber,
            { metadata: { uid: newProduct.uid, blockNumber: event.blockNumber } }
        );

        try {
            const block = await event.getBlock();
            await newProductStore.add({
                hash: newProduct.hash,
                id: newProduct.id,
                name: newProduct.name,
                number: newProduct.number,
                type: newProduct.Type,
                uid: newProduct.uid,
                timestamp: block.timestamp
            });
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { uid: newProduct.uid, blockNumber: event.blockNumber } }
            );
        }
    }
}