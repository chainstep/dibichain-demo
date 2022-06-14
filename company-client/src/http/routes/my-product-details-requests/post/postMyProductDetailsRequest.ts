import { Router } from "express";
import { body } from "express-validator";
import { Crypto } from "../../../../lib/Crypto";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { KeyStore } from "../../../../storage/key/KeyStore";
import { MyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/MyProductDetailsRequestStore";
import { NewProductStore } from "../../../../storage/new-product/NewProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidBodyInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { PostMyProductDetailsRequestService } from "./PostMyProductDetailsService";


export function createPostMyProductDetailsRequestRouter(): Router {
    return createRouter({
        method: "post",
        route: ROUTE_NAMES.myProductDetailsRequests,
        inputPath: "body",
        inputChecks: [
            body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + " uid"),
        ],
        middlewares: [ cleanseUidBodyInput ],
        service: new PostMyProductDetailsRequestService({
            getKeyStore: () => KeyStore.get(),
            getMyProductDetailsRequestStore: () => MyProductDetailsRequestStore.get(),
            getNewProductStore: () => NewProductStore.get(),
            crypto: new Crypto(),
            operator: new Operator({
                url: EnvVars.OPERATOR_URL,
                crypto: new Crypto()
            })
        })
    });
}