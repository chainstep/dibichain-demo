import { query } from "express-validator";
import { ProductDetailsResponseStore } from "../../../../storage/product-details-response/ProductDetailsResponseStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetProductDetailsResponseService } from "./GetProductDetailsResponsesService";


const missingOrInvalidText = "missing or invalid";

export const getProductDetailsResponseRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.productDetailsResponses,
    inputPath: "query",
    inputChecks: [
        query("uid").isUUID().withMessage(missingOrInvalidText + " uid"),
        query("publicKey").isString().withMessage(missingOrInvalidText + " publicKey")
    ],
    service: new GetProductDetailsResponseService({
        getProductDetailsResponseStore: () => ProductDetailsResponseStore.get()
    })
});