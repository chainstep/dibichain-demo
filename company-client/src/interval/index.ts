import { createPollProductsHandler } from "./handlers/poll-products/pollProducts";
import { createProductDetailsRequestTimeoutHandler } from "./handlers/product-details-request-timeout/productDetailsRequestTimeout";
import { IntervalManager } from "./IntervalManager";


export function initIntervals(): void {
    const pollProductsHandler = createPollProductsHandler();
    const productDetailsRequestTimeoutHandler = createProductDetailsRequestTimeoutHandler();

    IntervalManager.add(pollProductsHandler);
    IntervalManager.add(productDetailsRequestTimeoutHandler);

    IntervalManager.start();
}