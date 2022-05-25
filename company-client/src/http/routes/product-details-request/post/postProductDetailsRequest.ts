import { body } from "express-validator";
import { Crypto } from "../../../../lib/Crypto";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { ProductDetailsRequestStore } from "../../../../storage/productDetailsRequest/ProductDetailsRequestStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostProductDetailsRequestService } from "./PostProductDetailsService";


const missingOrInvalidText = "missing or invalid";

export const postProductDetailsRequestRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.productDetailsRequest,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(missingOrInvalidText + " uid"),
    ],
    service: new PostProductDetailsRequestService({
        getProductDetailsRequestStore: () => ProductDetailsRequestStore.get(),
        crypto: new Crypto(),
        operator: new Operator({
            url: EnvVars.OPERATOR_URL
        })
    })
});