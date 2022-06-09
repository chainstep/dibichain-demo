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
import { PollProductsService } from "./services/PollProductsService";


export function initIntervals(): void {
    const intervalName_10sec = "10-sec-interval";

    IntervalManager.add(
        new IntervalHandler({
            name: intervalName_10sec,
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

    IntervalManager.start(intervalName_10sec);
}