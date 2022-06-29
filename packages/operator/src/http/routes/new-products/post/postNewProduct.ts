import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { Contracts } from "../../../../contract/Contracts";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostNewProductService } from "./PostNewProductService";


/**
 * @swagger
 * /new-products:
 *   post:
 *     summary: Post a new product to the event bus contract
 *     tags: [New Products]
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
 *               id:
 *                 type: string
 *                 description: the uuid v4 of a product group
 *                 example: 0e66f0e4-1c4e-4781-8fd7-36058206d295
 *               name:
 *                 type: string
 *                 description: the product name
 *                 example: Bionic Partition
 *               type:
 *                 type: string
 *                 description: the product type [ assembly | purchase_part | standard_part ]
 *                 example: purchase_part
 *               number:
 *                 type: string
 *                 description: the product number
 *                 example: EAN 20359483920
 *               hash:
 *                 type: string
 *                 description: the normalized product hash
 *                 example: f031e34aaa900645b71588e731425526f1b158fb55f67ef37d05561f9b1b644d
 *             required:
 *               - uid
 *               - id
 *               - name
 *               - type
 *               - number
 *               - hash
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export function createPostNewProductRouter(): Router {
    return createRouter({
        method: "post",
        route: "/new-products",
        inputPath: "body",
        inputChecks: [
            body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
            body("id").isString().withMessage(INVALID_INPUT_TEXT + "id"),
            body("name").isString().withMessage(INVALID_INPUT_TEXT + "name"),
            body("type").isString().toLowerCase().custom(isProductType).withMessage(INVALID_INPUT_TEXT + "type"),
            body("number").isString().withMessage(INVALID_INPUT_TEXT + "number"),
            body("hash").isHash("sha256").withMessage(INVALID_INPUT_TEXT + "hash")
        ],
        middlewares: [ cleanseInputs],
        service: new PostNewProductService({
            eventBus: Contracts.getEventBus()
        })
    });
}

function isProductType(value: string): boolean {
    return value === "assembly"
        || value === "purchase_part"
        || value === "standard_part";
}

function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody: {uid: string, id: string, name: string, type: string, number: string, hash: string} = {
        hash: request.body.hash,
        id: request.body.id,
        name: request.body.name,
        number: request.body.number,
        type: request.body.type,
        uid: request.body.uid
    };

    request.body = newBody;
    next();
}