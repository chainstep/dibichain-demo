import { MyNewProductStore } from "../../../storage/my-new-product/MyNewProductStore";
import { NewProductStore } from "../../../storage/new-product/NewProductStore";
import { ProductStore } from "../../../storage/product/ProductStore";
import { SkipProductService } from "../../common/SkipProductsService";
import { ContractEventListener } from "../contractEventHandlerFactory";
import { NewProductService } from "./NewProductService";


export function createNewProductListener(): ContractEventListener {
    return {
        eventName: "NewProduct",
        services: [
            new SkipProductService({
                getStores: [
                    () => ProductStore.get()
                ]
            }),
            new NewProductService({
                getNewProductStore: () => NewProductStore.get(),
                getMyNewProductStore: () => MyNewProductStore.get()
            })
        ]
    };
}