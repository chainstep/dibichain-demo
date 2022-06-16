import { EnvVars } from "../../../lib/EnvVars";
import { MyProductDetailsRequestStore } from "../../../storage/my-product-details-request/MyProductDetailsRequestStore";
import { IntervalHandler } from "../../IntervalHandler";
import { ProductDetailsRequestTimeoutService } from "./ProductDetailsRequestTimeoutService";


export function createProductDetailsRequestTimeoutHandler(): IntervalHandler {
    return new IntervalHandler({
        name: "product-details-request-timeout-interval",
        pollingIntervalSec: 5 * 60,
        services: [
            new ProductDetailsRequestTimeoutService({
                myProductDetailsRequestStore: MyProductDetailsRequestStore.get(),
                timeoutMin: EnvVars.PRODUCT_DETAILS_REQUEST_TIMEOUT_MIN
            })
        ]
    });
}