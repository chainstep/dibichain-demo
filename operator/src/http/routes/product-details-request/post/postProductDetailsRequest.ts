import { body } from "express-validator";
import { Contracts } from "../../../../contract/Contracts";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostProductDetailsRequestService } from "./PostProductDetailsRequestService";


const missingOrInvalidText = "missing or invalid";

export const postProductDetailsRequestRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.productDetailsRequests,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(missingOrInvalidText + " uid"),
        body("publicKey").isString().withMessage(missingOrInvalidText + " publicKey"),
        body("algorithm").isString().withMessage(missingOrInvalidText + " algorithm"),
    ],
    service: new PostProductDetailsRequestService({
        getEventBus: () => Contracts.getEventBus()
    })
});