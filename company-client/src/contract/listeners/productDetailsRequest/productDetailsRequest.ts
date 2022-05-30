import { MyProductStore } from "../../../storage/myProduct/MyProductStore";
import { NewProductStore } from "../../../storage/newProduct/NewProductStore";
import { SkipProductsService } from "../../common/SkipProductsService";
import { ContractEventListener } from "../contractEventHandlerFactory";
import { ProductDetailsRequestService } from "./ProductDetailsRequestService";


export function createProductDetailsRequestListener(): ContractEventListener {
    return {
        eventName: "ProductDetailsRequest",
        services: [
            new SkipProductsService({
                getStore: () => MyProductStore.get(),
                skipNonExistingProducts: true
            }),
            new ProductDetailsRequestService({
                getNewProductStore: () => NewProductStore.get()
            })
        ]
    };
}