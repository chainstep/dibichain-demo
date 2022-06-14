import { EnvVars } from "../../../lib/EnvVars";
import { Operator } from "../../../lib/Operator";
import { DocumentStore } from "../../../storage/document/DocumentStore";
import { KeyStore } from "../../../storage/key/KeyStore";
import { MyProductDetailsRequestStore } from "../../../storage/my-product-details-request/MyProductDetailsRequestStore";
import { NewProductStore } from "../../../storage/new-product/NewProductStore";
import { ProductStore } from "../../../storage/product/ProductStore";
import { IntervalHandler } from "../../IntervalHandler";
import { PollProductsService } from "./PollProductsService";
import { Crypto } from "../../../lib/Crypto";


export function createPollProductsHandler(): IntervalHandler {
    return new IntervalHandler({
        name: "poll-products-interval",
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
    });
}