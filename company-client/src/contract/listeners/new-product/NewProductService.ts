import { Event } from "ethers";
import { IMyNewProductStore } from "../../../storage/my-new-product/IMyNewProductStore";
import { INewProductStore } from "../../../storage/new-product/INewProductStore";
import { NewProductEventParams } from "../../../types";
import { logger } from "../../../utils/logger";
import { ContractEventHandlerService } from "../contractEventHandlerFactory";


interface NewProductServiceOptions {
    getNewProductStore: () => INewProductStore;
    getMyNewProductStore: () => IMyNewProductStore;
}


export class NewProductService implements ContractEventHandlerService {
    private readonly getNewProductStore: () => INewProductStore;
    private readonly getMyNewProductStore: () => IMyNewProductStore;


    constructor(options: NewProductServiceOptions) {
        this.getNewProductStore = options.getNewProductStore;
        this.getMyNewProductStore = options.getMyNewProductStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const newProductStore = this.getNewProductStore();
        const myNewProductStore = this.getMyNewProductStore();

        const newProduct = <NewProductEventParams> inputs[1];
        const event = <Event> inputs[2];

        logger.event("NewProduct -> uid: " + newProduct.uid + ", block: " + event.blockNumber,
            { metadata: { uid: newProduct.uid, blockNumber: event.blockNumber } }
        );

        try {
            const block = await event.getBlock();
            const myNewProducts =  await myNewProductStore.find({ uid: newProduct.uid });
            const _newProduct = {
                hash: newProduct.hash,
                id: newProduct.id,
                name: newProduct.name,
                number: newProduct.number,
                type: newProduct.Type,
                uid: newProduct.uid,
                timestamp: block.timestamp
            };

            if (myNewProducts.length === 0) {
                await newProductStore.upsert(_newProduct);
            } else if (myNewProducts[0].timestamp === 0) {
                await myNewProductStore.upsert(_newProduct);
            }
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { uid: newProduct.uid, blockNumber: event.blockNumber } }
            );
        }
    }
}