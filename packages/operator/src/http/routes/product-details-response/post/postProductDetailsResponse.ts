import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { ProductDetailsResponseStore } from "../../../../storage/product-details-response/ProductDetailsResponseStore";
import { EncMessage } from "../../../../types";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostProductDetailsResponseService } from "./PostProductDetailsResponseService";


export function createPostProductDetailsResponseRouter(): Router {
    return createRouter({
        method: "post",
        route: "/product-details-responses",
        inputPath: "body",
        inputChecks: [
            body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
            body("publicKey").isString().withMessage(INVALID_INPUT_TEXT + "publicKey"),
            body("message").isObject().withMessage(INVALID_INPUT_TEXT + "message"),
            body("message.secret").isString().withMessage(INVALID_INPUT_TEXT + "message.secret"),
            body("message.cipherText").isString().withMessage(INVALID_INPUT_TEXT + "message.cipherText"),
            body("message.initVector").isString().withMessage(INVALID_INPUT_TEXT + "message.initVector"),
        ],
        middlewares: [ cleanseInputs ],
        service: new PostProductDetailsResponseService({
            productDetailsResponseStore: ProductDetailsResponseStore.get()
        })
    });
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody: { uid: string; publicKey: string; message: EncMessage } = {
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