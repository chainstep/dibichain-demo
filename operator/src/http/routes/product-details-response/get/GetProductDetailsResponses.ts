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
        query("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
        query("publicKey").isString().withMessage(INVALID_INPUT_TEXT + "publicKey")
    ],
    service: new GetProductDetailsResponseService({
        getProductDetailsResponseStore: () => ProductDetailsResponseStore.get()
    })
});