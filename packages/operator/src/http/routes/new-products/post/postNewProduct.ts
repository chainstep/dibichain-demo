import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { Contracts } from "../../../../contract/Contracts";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostNewProductService } from "./PostNewProductService";


export function createPostNewProductRouter(): Router {
    return createRouter({
        method: "post",
        route: "/new-products",
        inputPath: "body",
        inputChecks: [
            body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
            body("id").isString().withMessage(INVALID_INPUT_TEXT + "id"),
            body("name").isString().withMessage(INVALID_INPUT_TEXT + "name"),
            body("type").isString().toLowerCase().custom(isProductType).withMessage(INVALID_INPUT_TEXT + "type"),
            body("number").isString().withMessage(INVALID_INPUT_TEXT + "number"),
            body("hash").isHash("sha256").withMessage(INVALID_INPUT_TEXT + "hash")
        ],
        middlewares: [ cleanseInputs ],
        service: new PostNewProductService({
            eventBus: Contracts.getEventBus()
        })
    });
}

function isProductType(value: string): boolean {
    return value === "assembly"
        || value === "purchase_part"
        || value === "standard_part";
}

function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody: {uid: string, id: string, name: string, type: string, number: string, hash: string} = {
        hash: request.body.hash,
        id: request.body.id,
        name: request.body.name,
        number: request.body.number,
        type: request.body.type,
        uid: request.body.uid
    };

    request.body = newBody;
    next();
}