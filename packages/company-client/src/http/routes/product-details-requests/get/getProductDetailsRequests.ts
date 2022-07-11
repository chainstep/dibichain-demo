import { Router } from "express";
import { query } from "express-validator";
import { ProductDetailsRequestStore } from "../../../../storage/product-details-request/ProductDetailsRequestStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetProductDetailsRequestsService } from "./GetProductDetailsRequestsService";


/**
 * @swagger
 * /product-details-requests:
 *   get:
 *     summary: Get received product details requests
 *     description: This route lets you retrieve the received product details requests
 *     tags: [Product Details Requests]
 *     parameters:
 *       - in: query
 *         name: uid
 *         description: The uid of the product. Returns all product details requests if no uid is provided
 *         schema:
 *           type: string
 *         example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *     responses:
 *       200:
 *         description: the list of product details requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     myNewProducts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ProductDetailsRequest'
 */
export function createGetProductDetailsRequestsRouter(): Router {
    return createRouter({
        method: "get",
        route: "/product-details-requests",
        inputPath: "query",
        inputChecks: [
            query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
        ],
        middlewares: [ cleanseUidQueryInput ],
        service: new GetProductDetailsRequestsService({
            productDetailsRequestStore: ProductDetailsRequestStore.get()
        })
    });
}