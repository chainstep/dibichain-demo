import { NewProductStore } from "../../../storage/newProduct/NewProductStore";
import { ContractEventListener } from "../contractEventHandlerFactory";
import { ProductDetailsRequestService } from "./ProductDetailsRequestService";


export function createProductDetailsRequestListener(): ContractEventListener {
    return {
        eventName: "ProductDetailsRequest",
        services: [
            new ProductDetailsRequestService({
                getNewProductStore: () => NewProductStore.get()
            })
        ]
    };
}