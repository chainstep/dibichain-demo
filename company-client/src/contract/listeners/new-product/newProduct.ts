import { ProductStore } from "../../../storage/product/ProductStore";
import { ContractEventListener } from "../contractEventHandlerFactory";
import { NewProductService } from "./NewProductService";
import { SkipProductsService } from "../../common/SkipProductsService";
import { MyProductStore } from "../../../storage/my-product/MyProductStore";
import { NewProductStore } from "../../../storage/new-product/NewProductStore";


export function createNewProductListener(): ContractEventListener {
    return {
        eventName: "NewProduct",
        services: [
            new SkipProductsService({
                getStore: () => NewProductStore.get()
            }),
            new SkipProductsService({
                getStore: () => ProductStore.get()
            }),
            new SkipProductsService({
                getStore: () => MyProductStore.get()
            }),
            new NewProductService({
                getNewProductStore: () => NewProductStore.get()
            })
        ]
    };
}