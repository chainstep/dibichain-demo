import { createPollProductsHandler } from "./handlers/poll-products/pollProducts";
import { createProductDetailsRequestTimeoutHandler } from "./handlers/product-details-request-timeout/productDetailsRequestTimeout";


export function initIntervals(): void {
    const intervalHandlers = [
        createPollProductsHandler(),
        createProductDetailsRequestTimeoutHandler()
    ];

    intervalHandlers.forEach((intervalHandler) => {
        intervalHandler.start();
    });
}