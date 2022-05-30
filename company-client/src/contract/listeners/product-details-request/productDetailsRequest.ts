import { MyProductStore } from "../../../storage/my-product/MyProductStore";
import { ProductDetailsRequestStore } from "../../../storage/product-details-request/ProductDetailsRequestStore";
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
                getProductDetailsRequestStore: () => ProductDetailsRequestStore.get()
            })
        ]
    };
}