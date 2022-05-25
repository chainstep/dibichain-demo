import { body } from "express-validator";
import { Crypto } from "../../../../lib/Crypto";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { MyProductDetailsRequestStore } from "../../../../storage/myProductDetailsRequest/MyProductDetailsRequestStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostMyProductDetailsRequestService } from "./PostMyProductDetailsService";


const missingOrInvalidText = "missing or invalid";

export const postMyProductDetailsRequestRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.myProductDetailsRequest,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(missingOrInvalidText + " uid"),
    ],
    service: new PostMyProductDetailsRequestService({
        getMyProductDetailsRequestStore: () => MyProductDetailsRequestStore.get(),
        crypto: new Crypto(),
        operator: new Operator({
            url: EnvVars.OPERATOR_URL
        })
    })
});