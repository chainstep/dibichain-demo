import { Crypto } from "../lib/Crypto";
import { EnvVars } from "../lib/EnvVars";
import { Operator } from "../lib/Operator";
import { DocumentStore } from "../storage/document/DocumentStore";
import { KeyStore } from "../storage/key/KeyStore";
import { MyProductDetailsRequestStore } from "../storage/my-product-details-request/MyProductDetailsRequestStore";
import { NewProductStore } from "../storage/new-product/NewProductStore";
import { ProductStore } from "../storage/product/ProductStore";
import { IntervalHandler } from "./IntervalHandler";
import { IntervalManager } from "./IntervalManager";
import { ProductDetailsRequestTimeoutService } from "./services/ProductDetailsRequestTimeoutService";
import { PollProductsService } from "./services/PollProductsService";


export function initIntervals(): void {
    IntervalManager.add(
        new IntervalHandler({
            name: "10-sec-interval",
            pollingIntervalSec: 10,
            services: [
                new PollProductsService({
                    getKeyStore: () => KeyStore.get(),
                    getMyProductDetailsRequestStore: () => MyProductDetailsRequestStore.get(),
                    getProductStore: () => ProductStore.get(),
                    getNewProductStore: () => NewProductStore.get(),
                    getDocumentStore: () => DocumentStore.get(),
                    operator: new Operator({
                        url: EnvVars.OPERATOR_URL,
                        crypto: new Crypto()
                    })
                })
            ]
        })
    );

    IntervalManager.add(
        new IntervalHandler({
            name: "product-details-request-timeout-check-interval",
            pollingIntervalSec: 5 * 60,
            services: [
                new ProductDetailsRequestTimeoutService({
                    getMyProductDetailsRequestStore: () => MyProductDetailsRequestStore.get(),
                    timeoutMin: EnvVars.PRODUCT_DETAILS_REQUEST_TIMEOUT_MIN
                })
            ]
        })
    );

    IntervalManager.start();
}