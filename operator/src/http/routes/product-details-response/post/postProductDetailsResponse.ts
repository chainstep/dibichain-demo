import { body } from "express-validator";
import { ProductDetailsResponseStore } from "../../../../storage/product-details-response/ProductDetailsResponseStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostProductDetailsResponseService } from "./PostProductDetailsResponseService";


const missingOrInvalidText = "missing or invalid";

export const postProductDetailsResponseRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.productDetailsResponses,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(missingOrInvalidText + " uid"),
        body("publicKey").isString().withMessage(missingOrInvalidText + " publicKey"),
        body("message").isObject().withMessage(missingOrInvalidText + " message"),
        body("message.secret").isString().withMessage(missingOrInvalidText + " message.secret"),
        body("message.cipherText").isString().withMessage(missingOrInvalidText + " message.cipherText"),
        body("message.initVector").isString().withMessage(missingOrInvalidText + " message.initVector"),
    ],
    service: new PostProductDetailsResponseService({
        getProductDetailsResponseStore: () => ProductDetailsResponseStore.get()
    })
});