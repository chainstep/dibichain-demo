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
        query("publicKeys").isString().custom(isArray).customSanitizer(toArray).withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    service: new GetProductDetailsResponseService({
        getProductDetailsResponseStore: () => ProductDetailsResponseStore.get()
    })
});

function isArray(value: string): boolean {
    try {
        return Array.isArray(JSON.parse(value));
    } catch (error) {
        return false;
    }
}

function toArray(value: string): boolean {
    return JSON.parse(value);
}