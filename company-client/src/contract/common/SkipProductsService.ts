import { logger } from "../../utils/logger";
import { ContractEventHandlerService, ContractEventServiceCode } from "../listeners/contractEventHandlerFactory";


interface Store {
    find(params: {uid?: string}): Promise<{uid: string}[]>;
}

interface SkipProductServiceOptions {
    getStores: (() => Store)[];
    skipIfNotFound?: boolean
}


export class SkipProductService implements ContractEventHandlerService {
    private readonly getStores: (() => Store)[];
    private readonly skipNonExistingProduct?: boolean;


    constructor(options: SkipProductServiceOptions) {
        this.getStores = options.getStores;
        this.skipNonExistingProduct = options.skipIfNotFound;
    }


    public async run(inputs: unknown[]): Promise<ContractEventServiceCode> {
        const product = <{uid: string}> inputs[1];
        const stores = <Store[]> [];
        this.getStores.forEach(getStore => stores.push(getStore()));

        try {
            const products = await this.getProducts(stores, product.uid);

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