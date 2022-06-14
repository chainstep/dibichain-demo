import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { Contracts } from "../../../../contract/Contracts";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostProductDetailsRequestService } from "./PostProductDetailsRequestService";


export const postProductDetailsRequestRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.productDetailsRequests,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
        body("publicKey").isString().withMessage(INVALID_INPUT_TEXT + "publicKey"),
        body("algorithm").isString().withMessage(INVALID_INPUT_TEXT + "algorithm"),
    ],
    middlewares: [ cleanseInputs],
    service: new PostProductDetailsRequestService({
        getEventBus: () => Contracts.getEventBus()
    })
});

function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody: {uid: string, publicKey: string, algorithm: string} = {
        uid: request.body.uid,
        algorithm: request.body.algorithm,
        publicKey: request.body.publicKey
    };

    request.body = newBody;
    next();
}