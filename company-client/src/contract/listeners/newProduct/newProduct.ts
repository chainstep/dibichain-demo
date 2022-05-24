import { NewProductStore } from "../../../storage/newProduct/NewProductStore";
import { ProductStore } from "../../../storage/product/ProductStore";
import { NewProductEventParams } from "../../../types";
import { logger } from "../../../utils/logger";
import { ContractEventListener, ContractEventMiddlewareCode } from "../contractEventHandlerFactory";
import { NewProductService } from "./NewProductService";


export function createNewProductListener(): ContractEventListener {
    return {
        eventName: "NewProduct",
        middlewares: [
            skipExistingNewProducts,
            skipExistingProducts
        ],
        service: new NewProductService({
            getNewProductStore: () => NewProductStore.get()
        })
    };
}

async function skipExistingProducts(args: unknown[]): Promise<ContractEventMiddlewareCode> {
    const product = <NewProductEventParams> args[1];
    const productStore = ProductStore.get();

    try {
        const products = await productStore.find({ uid: product.uid });
        if (products.length !== 0) {
            return ContractEventMiddlewareCode.STOP;
        }
    } catch (error) {
        logger.error((<Error> error).message);
        return ContractEventMiddlewareCode.STOP;
    }

    return ContractEventMiddlewareCode.CONTINUE;
}

async function skipExistingNewProducts(args: unknown[]): Promise<ContractEventMiddlewareCode> {
    const product = <NewProductEventParams> args[1];
    const newProductStore = NewProductStore.get();

    try {
        const newProduct = await newProductStore.find({ uid: product.uid });
        if (newProduct.length !== 0) {
            return ContractEventMiddlewareCode.STOP;
        }
    } catch (error) {
        logger.error((<Error> error).message);
        return ContractEventMiddlewareCode.STOP;
    }

    return ContractEventMiddlewareCode.CONTINUE;
}