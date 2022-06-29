/* eslint-disable max-len */
import { Router } from "express";
import { query } from "express-validator";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetMyProductsService } from "./GetMyProductsService";


/**
 * @swagger
 * /my-products:
 *   get:
 *     summary: Get my new product
 *     description: This route lets you retrieve your products from the company client
 *     tags: [My Product]
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
 *                     myProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           uid:
 *                             type: string
 *                             description: the uuid v4 of a product
 *                             example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *                           id:
 *                             type: string
 *                             description: the uuid v4 of a product group
 *                             example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *                           name:
 *                             type: string
 *                             description: the product name
 *                             example: Bionic Partition
 *                           type:
 *                             type: string
 *                             description: the product type [ assembly | purchase_part | standard_part ]
 *                             example: purchase_part
 *                           number:
 *                             type: string
 *                             description: the product number
 *                             example: EAN 20359483920
 *                           documents:
 *                             type: array
 *                             description: an array of uids of associated documents
 *                             example: [8181c8ae-eef1-4703-8498-2cf25be2877b, 81c0db28-9d72-4e36-b0f2-e166408bc839]
 *                           amount:
 *                             type: number
 *                             description: the amount of the product
 *                             example: 1
 *                           amountUnit:
 *                             type: string
 *                             description: the amount unit of the product [ each | l/liter | cm/centimeter | cm2/square_centimeter | cm3/cubic_centimeter | m/meter | m2/square_meter | m3/cubic_meter ]
 *                             example: cm
 *                           weight:
 *                             type: number
 *                             description: the weight of the product
 *                             example: 1
 *                           weightUnit:
 *                             type: string
 *                             description: the weight unit of the product [ mg/milligram | g/gram | kg/kilogram | %/percentage | ppm/parts_per_million ]
 *                             example: kg
 *                           carbonFootprint:
 *                             type: number
 *                             description: the carbon footprint of the product
 *                             example: 1
 *                           carbonFootprintUnit:
 *                             type: string
 *                             description: the carbon footprint unit of the product [ mg/milligram | g/gram | kg/kilogram ]
 *                             example: kg
 */


export function createGetMyProductsRouter(): Router {
    return createRouter({
        method: "get",
        route: ROUTE_NAMES.myProducts,
        inputPath: "query",
        inputChecks: [
            query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
        ],
        middlewares: [ cleanseUidQueryInput ],
        service: new GetMyProductsService({
            myProductStore: MyProductStore.get()
        })
    });
}