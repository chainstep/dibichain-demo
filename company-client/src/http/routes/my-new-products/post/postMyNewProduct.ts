import { Router } from "express";
import { body } from "express-validator";
import { Crypto } from "../../../../lib/Crypto";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { MyNewProductStore } from "../../../../storage/my-new-product/MyNewProductStore";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidBodyInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { PostMyNewProductService } from "./PostMyNewProductService";


export function createPostMyNewProductRouter(): Router {
    return createRouter({
        method: "post",
        route: ROUTE_NAMES.myNewProducts,
        inputPath: "body",
        inputChecks: [
            body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
        ],
        middlewares: [ cleanseUidBodyInput ],
        service: new PostMyNewProductService({
            myProductStore: MyProductStore.get(),
            myNewProductStore: MyNewProductStore.get(),
            operator: new Operator({
                url: EnvVars.OPERATOR_URL,
                crypto: new Crypto()
            })
        })
    });
}
