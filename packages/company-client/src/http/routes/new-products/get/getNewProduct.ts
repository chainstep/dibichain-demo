import { Router } from "express";
import { query } from "express-validator";
import { NewProductStore } from "../../../../storage/new-product/NewProductStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetNewProductsService } from "./GetNewProductsService";


/**
 * @swagger
 * /new-products:
 *   get:
 *     summary: Get received product announcements
 *     description: This route lets you retrieve the received product announcements
 *     tags: [New Products]
 *     parameters:
 *       - in: query
 *         name: uid
 *         description: The uid of the product. Returns all product announcements if no uid is provided
 *         schema:
 *           type: string
 *         example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *     responses:
 *       200:
 *         description: the list of new product announcements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     newProducts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/NewProduct'
 */
export function createGetNewProductsRouter(): Router {
    return createRouter({
        method: "get",
        route: "/new-products",
        inputPath: "query",
        inputChecks: [
            query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
        ],
        middlewares: [ cleanseUidQueryInput ],
        service: new GetNewProductsService({
            newProductStore: NewProductStore.get()
        })
    });
}