import { Router } from "express";
import { body } from "express-validator";
import { Crypto } from "../../../../lib/Crypto";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { MyNewProductStore } from "../../../../storage/my-new-product/MyNewProductStore";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { cleanseUidBodyInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { PostMyNewProductService } from "./PostMyNewProductService";


/**
 * @swagger
 * /my-new-products:
 *   post:
 *     summary: Announces a new product
 *     description: This route lets you announce a new product to the dibichain
 *     tags: [New Products]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export function createPostMyNewProductRouter(): Router {
    return createRouter({
        method: "post",
        route: "/my-new-products",
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
