import { logger } from "../../utils/logger";
import { ContractEventHandlerService, ContractEventServiceCode } from "../listeners/contractEventHandlerFactory";


interface Store {
    find(params: {uid?: string}): Promise<{uid: string}[]>;
}

interface SkipProductsServiceOptions {
    getStore: () => Store;
    skipNonExistingProducts?: boolean
}


export class SkipProductsService implements ContractEventHandlerService {
    private readonly getStore: () => Store;
    private readonly skipNonExistingProducts?: boolean;


    constructor(options: SkipProductsServiceOptions) {
        this.getStore = options.getStore;
        this.skipNonExistingProducts = options.skipNonExistingProducts;
    }


    async run(inputs: unknown[]): Promise<ContractEventServiceCode> {
        const product = <{uid: string}> inputs[1];
        const store = this.getStore();

        try {
            const products = await store.find({ uid: product.uid });
            if (!this.skipNonExistingProducts && products.length !== 0) {
                return ContractEventServiceCode.STOP;
            }
            if (this.skipNonExistingProducts && products.length === 0) {
                return ContractEventServiceCode.STOP;
            }
        } catch (error) {
            logger.error((<Error> error).message);
            return ContractEventServiceCode.STOP;
        }

        return ContractEventServiceCode.CONTINUE;
    }
}