import { Router } from "express";
import { query } from "express-validator";
import { ProductStore } from "../../../../storage/product/ProductStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetProductsService } from "./GetProductsService";


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get requested products
 *     description: This route lets you retrieve requested products from the company client
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: uid
 *         description: The uid of the product. Returns all products if no uid is provided
 *         schema:
 *           type: string
 *         example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *     responses:
 *       200:
 *         description: the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 */
export function createGetProductsRouter(): Router {
    return createRouter({
        method: "get",
        route: "/products",
        inputPath: "query",
        inputChecks: [
            query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
        ],
        middlewares: [ cleanseUidQueryInput ],
        service: new GetProductsService({
            productStore: ProductStore.get()
        })
    });
}