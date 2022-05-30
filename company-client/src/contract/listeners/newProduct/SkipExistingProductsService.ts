import { logger } from "../../../utils/logger";
import { ContractEventHandlerService, ContractEventServiceCode } from "../contractEventHandlerFactory";


interface Store {
    find(params: {uid?: string}): Promise<{uid: string}[]>;
}

interface SkipExistingProductsServiceOptions {
    getStore: () => Store;
}


export class SkipExistingProductsService implements ContractEventHandlerService {
    private readonly getStore: () => Store;


    constructor(options: SkipExistingProductsServiceOptions) {
        this.getStore = options.getStore;
    }


    async run(inputs: unknown[]): Promise<ContractEventServiceCode> {
        const product = <{uid: string}> inputs[1];
        const store = this.getStore();

        try {
            const products = await store.find({ uid: product.uid });
            if (products.length !== 0) {
                return ContractEventServiceCode.STOP;
            }
        } catch (error) {
            logger.error((<Error> error).message);
            return ContractEventServiceCode.STOP;
        }

        return ContractEventServiceCode.CONTINUE;
    }
}