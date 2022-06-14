import { logger } from "../../utils/logger";
import { ContractEventService, ContractEventServiceCode } from "../ContractEventHandler";


interface Store {
    find(params: {uid?: string}): Promise<{uid: string}[]>;
}

interface SkipProductServiceOptions {
    stores: Store[];
    skipIfNotFound?: boolean
}


export class SkipProductService implements ContractEventService {
    private readonly stores: Store[];
    private readonly skipNonExistingProduct?: boolean;


    constructor(options: SkipProductServiceOptions) {
        this.stores = options.stores;
        this.skipNonExistingProduct = options.skipIfNotFound;
    }


    public async run(inputs: unknown[]): Promise<ContractEventServiceCode> {
        const product = <{uid: string}> inputs[1];

        try {
            const products = await this.getProducts(this.stores, product.uid);

            if (!this.skipNonExistingProduct && products.length !== 0) {
                return ContractEventServiceCode.STOP;
            }
            if (this.skipNonExistingProduct && products.length === 0) {
                return ContractEventServiceCode.STOP;
            }
        } catch (error) {
            logger.error((<Error> error).message);
            return ContractEventServiceCode.STOP;
        }

        return ContractEventServiceCode.CONTINUE;
    }

    private async getProducts(stores: Store[], uid: string): Promise<{uid: string}[]> {
        let products = <{uid: string}[]> [];
        for (let i = 0 ; i < stores.length ; i++) {
            const store = stores[i];
            const _products = await store.find({ uid });
            products = [...products, ..._products];
        }
        return products;
    }
}