import { body } from "express-validator";
import { Crypto } from "../../../../lib/Crypto";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { ProductDetailsRequestStore } from "../../../../storage/product-details-request/ProductDetailsRequestStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostMyProductDetailsResponseService } from "./PostMyProductDetailsResponseService";


export const postMyProductDetailsResponsesRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.myProductDetailsResponses,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + " uid"),
    ],
    service: new PostMyProductDetailsResponseService({
        getProductDetailsRequestStore: () => ProductDetailsRequestStore.get(),
        getMyProductStore: () => MyProductStore.get(),
        operator: new Operator({
            url: EnvVars.OPERATOR_URL,
            crypto: new Crypto()
        })
    })
});