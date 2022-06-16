import { MyProductDetailsRequestStore } from "../../../storage/my-product-details-request/MyProductDetailsRequestStore";
import { MyProductStore } from "../../../storage/my-product/MyProductStore";
import { ProductDetailsRequestStore } from "../../../storage/product-details-request/ProductDetailsRequestStore";
import { SkipProductService } from "../../common/SkipProductsService";
import { ContractEventListener } from "../../ContractEventHandler";
import { ProductDetailsRequestService } from "./ProductDetailsRequestService";


export function createProductDetailsRequestListener(): ContractEventListener {
    return {
        eventName: "ProductDetailsRequest",
        services: [
            new SkipProductService({
                stores: [
                    MyProductStore.get(),
                    MyProductDetailsRequestStore.get()
                ],
                skipIfNotFound: true
            }),
            new ProductDetailsRequestService({
                productDetailsRequestStore: ProductDetailsRequestStore.get(),
                myProductDetailsRequestStore: MyProductDetailsRequestStore.get()
            })
        ]
    };
}