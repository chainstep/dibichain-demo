import { logger } from "../../utils/logger";
import { ContractEventService, ContractEventServiceCode } from "../ContractEventHandler";


interface Store {
    find(params: {uid?: string}): Promise<{uid: string}[]>;
}

interface ServiceOptions {
    stores: Store[];
    skipIfNotFound?: boolean
}


export class SkipProductService implements ContractEventService {
    constructor(private readonly options: ServiceOptions) {}


    public async run(inputs: unknown[]): Promise<ContractEventServiceCode> {
        try {
            const product = <{uid: string}> inputs[1];
            const products = await this.getProducts(this.options.stores, product.uid);

            if ((!this.options.skipIfNotFound && products.length !== 0)
              || (this.options.skipIfNotFound && products.length === 0)) {
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