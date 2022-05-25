import { body } from "express-validator";
import { Crypto } from "../../../../lib/Crypto";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { MyProductDetailsRequestStore } from "../../../../storage/myProductDetailsRequest/MyProductDetailsRequestStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostMyProductDetailsRequestService } from "./PostMyProductDetailsService";


export const postMyProductDetailsRequestRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.myProductDetailsRequests,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + " uid"),
    ],
    service: new PostMyProductDetailsRequestService({
        getMyProductDetailsRequestStore: () => MyProductDetailsRequestStore.get(),
        crypto: new Crypto(),
        operator: new Operator({
            url: EnvVars.OPERATOR_URL
        })
    })
});