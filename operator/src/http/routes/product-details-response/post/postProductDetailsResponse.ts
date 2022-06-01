import { body } from "express-validator";
import { ProductDetailsResponseStore } from "../../../../storage/product-details-response/ProductDetailsResponseStore";
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
    service: new PostProductDetailsResponseService({
        getProductDetailsResponseStore: () => ProductDetailsResponseStore.get()
    })
});