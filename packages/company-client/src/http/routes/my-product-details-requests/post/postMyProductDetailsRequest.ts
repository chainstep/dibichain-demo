import { Router } from "express";
import { body } from "express-validator";
import { Crypto } from "../../../../lib/Crypto";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { KeyStore } from "../../../../storage/key/KeyStore";
import { MyProductDetailsRequestStore } from "../../../../storage/my-product-details-request/MyProductDetailsRequestStore";
import { NewProductStore } from "../../../../storage/new-product/NewProductStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { cleanseUidBodyInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { PostMyProductDetailsRequestService } from "./PostMyProductDetailsService";


/**
 * @swagger
 * /my-product-details-requests:
 *   post:
 *     summary: Announces a new product details request
 *     description: This route lets you announce a new product details request to the dibichain
 *     tags: [Product Details Requests]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: the uuid v4 of a product
 *                 example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *             required:
 *               - uid
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export function createPostMyProductDetailsRequestRouter(): Router {
    return createRouter({
        method: "post",
        route: "/my-product-details-requests",
        inputPath: "body",
        inputChecks: [
            body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + " uid"),
        ],
        middlewares: [ cleanseUidBodyInput ],
        service: new PostMyProductDetailsRequestService({
            keyStore: KeyStore.get(),
            myProductDetailsRequestStore:  MyProductDetailsRequestStore.get(),
            newProductStore: NewProductStore.get(),
            crypto: new Crypto(),
            operator: new Operator({
                url: EnvVars.OPERATOR_URL,
                crypto: new Crypto()
            })
        })
    });
}