import { NewProductStore } from "../../../storage/newProduct/NewProductStore";
import { ProductStore } from "../../../storage/product/ProductStore";
import { ContractEventListener } from "../contractEventHandlerFactory";
import { NewProductService } from "./NewProductService";
import { SkipExistingProductsService } from "./SkipExistingProductsService";


export function createNewProductListener(): ContractEventListener {
    return {
        eventName: "NewProduct",
        services: [
            new SkipExistingProductsService({
                getStore: () => NewProductStore.get()
            }),
            new SkipExistingProductsService({
                getStore: () => ProductStore.get()
            }),
            new NewProductService({
                getNewProductStore: () => NewProductStore.get()
            })
        ]
    };
}