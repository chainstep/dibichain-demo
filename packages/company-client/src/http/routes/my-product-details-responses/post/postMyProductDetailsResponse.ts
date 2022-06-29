import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { Crypto } from "../../../../lib/Crypto";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { MyDocumentStore } from "../../../../storage/my-document/MyDocumentStore";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { ProductDetailsRequestStore } from "../../../../storage/product-details-request/ProductDetailsRequestStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostMyProductDetailsResponseService } from "./PostMyProductDetailsResponseService";


export function createPostMyProductDetailsResponsesRouter(): Router {
    return createRouter({
        method: "post",
        route: "/my-product-details-responses",
        inputPath: "body",
        inputChecks: [
            body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
            body("publicKey").isString().withMessage(INVALID_INPUT_TEXT + "publicKey"),
            body("decline").optional().isBoolean().withMessage(INVALID_INPUT_TEXT + "decline")
        ],
        middlewares: [ cleanseInputs],
        service: new PostMyProductDetailsResponseService({
            productDetailsRequestStore: ProductDetailsRequestStore.get(),
            myProductStore: MyProductStore.get(),
            myDocumentStore: MyDocumentStore.get(),
            operator: new Operator({
                url: EnvVars.OPERATOR_URL,
                crypto: new Crypto()
            })
        })
    });
}

function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody: {uid: string, publicKey: string, decline: boolean} = {
        decline: request.body.decline,
        publicKey: request.body.publicKey,
        uid: request.body.uid
    };

    request.body = newBody;
    next();
}