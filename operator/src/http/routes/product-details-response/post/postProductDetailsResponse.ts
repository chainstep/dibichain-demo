import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ProductDetailsResponseStore } from "../../../../storage/product-details-response/ProductDetailsResponseStore";
import { EncMessage } from "../../../../types";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostProductDetailsResponseService } from "./PostProductDetailsResponseService";


export const postProductDetailsResponseRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.productDetailsResponses,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
        body("publicKey").isString().withMessage(INVALID_INPUT_TEXT + "publicKey"),
        body("message").isObject().withMessage(INVALID_INPUT_TEXT + "message"),
        body("message.secret").isString().withMessage(INVALID_INPUT_TEXT + "message.secret"),
        body("message.cipherText").isString().withMessage(INVALID_INPUT_TEXT + "message.cipherText"),
        body("message.initVector").isString().withMessage(INVALID_INPUT_TEXT + "message.initVector"),
    ],
    middlewares: [ cleanseInputs],
    service: new PostProductDetailsResponseService({
        getProductDetailsResponseStore: () => ProductDetailsResponseStore.get()
    })
});


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody: {
        uid: string,
        publicKey: string,
        message: EncMessage
    } = {
        publicKey: request.body.publicKey,
        uid: request.body.uid,
        message: {
            cipherText: request.body.message.cipherText,
            initVector: request.body.message.initVector,
            secret: request.body.message.secret
        }
    };

    request.body = newBody;
    next();
}