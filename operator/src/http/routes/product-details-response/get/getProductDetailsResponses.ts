import { NextFunction, Request, Response } from "express";
import { query } from "express-validator";
import { ProductDetailsResponseStore } from "../../../../storage/product-details-response/ProductDetailsResponseStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetProductDetailsResponseService } from "./GetProductDetailsResponsesService";


export const getProductDetailsResponseRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.productDetailsResponses,
    inputPath: "query",
    inputChecks: [
        query("publicKeys")
            .isString()
            .custom(isStringifiedStringArray)
            .customSanitizer(toArray)
            .withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    middlewares: [ cleanseInputs],
    service: new GetProductDetailsResponseService({
        getProductDetailsResponseStore: () => ProductDetailsResponseStore.get()
    })
});

function isStringifiedStringArray(value: string): boolean {
    try {
        const array = JSON.parse(value);
        if (!Array.isArray(array)) {
            return false;
        }
        for (let i = 0 ; i < array.length ; i++) {
            if (typeof array[i] !== "string") {
                return false;
            }
        }
        return true;
    } catch (error) {
        return false;
    }
}

function toArray(value: string): unknown {
    return JSON.parse(value);
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newQuery = {
        publicKeys: <string[]> []
    };

    (<string[]> request.query.publicKeys).forEach((publicKey) => {
        newQuery.publicKeys.push(publicKey);
    });

    request.query = newQuery;
    next();
}