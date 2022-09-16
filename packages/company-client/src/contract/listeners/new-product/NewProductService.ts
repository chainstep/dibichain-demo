import { Event } from "ethers";
import { IMyNewProductStore } from "../../../storage/my-new-product/IMyNewProductStore";
import { INewProductStore } from "../../../storage/new-product/INewProductStore";
import { NewProductEventParams } from "../../../types";
import { logger } from "../../../utils/logger";
import { ContractEventService } from "../../ContractEventHandler";


interface Options {
    newProductStore: INewProductStore;
    myNewProductStore: IMyNewProductStore;
}


export class NewProductService implements ContractEventService {
    constructor(private readonly options: Options) {}


    async run(inputs: unknown[]): Promise<void> {
        const newProduct = <NewProductEventParams> inputs[1];
        const event = <Event> inputs[2];

        logger.event("NewProduct -> uid: " + newProduct.uid + ", block: " + event.blockNumber,
            { metadata: { uid: newProduct.uid, blockNumber: event.blockNumber } }
        );

        try {
            const block = await event.getBlock();
            const myNewProducts =  await this.options.myNewProductStore.find({ uid: newProduct.uid });
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
                await this.options.newProductStore.upsert(_newProduct);
            } else if (myNewProducts[0].timestamp === 0) {
                await this.options.myNewProductStore.upsert(_newProduct);
            }
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { uid: newProduct.uid, blockNumber: event.blockNumber } }
            );
        }
    }
}