/* eslint-disable max-len */
import { randomUUID } from "crypto";
import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { MyProduct } from "../../../../types";
import { isAmountUnit, isCarbonFootprintUnit, isDocumentIdArray, isProductType, isWeightUnit } from "../../../../utils/propertyCheckers";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostMyProductService } from "./PostMyProductService";


 interface MyProductParams extends Omit<MyProduct, "id" | "uid"> {
    id?: string;
    uid?: string;
}


/**
 * @swagger
 * /my-products:
 *   post:
 *     summary: Post a new product
 *     tags: [My Product]
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
 *               documents:
 *                 type: array
 *                 description: an array of uids of associated documents
 *                 example: [8181c8ae-eef1-4703-8498-2cf25be2877b, 81c0db28-9d72-4e36-b0f2-e166408bc839]
 *               amount:
 *                 type: number
 *                 description: the amount of the product
 *                 example: 1
 *               amountUnit:
 *                 type: string
 *                 description: the amount unit of the product [ each | l/liter | cm/centimeter | cm2/square_centimeter | cm3/cubic_centimeter | m/meter | m2/square_meter | m3/cubic_meter ]
 *                 example: cm
 *               weight:
 *                 type: number
 *                 description: the weight of the product
 *                 example: 1
 *               weightUnit:
 *                 type: string
 *                 description: the weight unit of the product [ mg/milligram | g/gram | kg/kilogram | %/percentage | ppm/parts_per_million ]
 *                 example: kg
 *               carbonFootprint:
 *                 type: number
 *                 description: the carbon footprint of the product
 *                 example: 1
 *               carbonFootprintUnit:
 *                 type: string
 *                 description: the carbon footprint unit of the product [ mg/milligram | g/gram | kg/kilogram ]
 *                 example: kg
 *             required:
 *               - name
 *               - type
 *               - number
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

export function createPostMyProductRouter(): Router {
    return createRouter({
        method: "post",
        route: "/my-products",
        inputPath: "body",
        inputChecks: [
            body("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
            body("id").optional().isString().withMessage(INVALID_INPUT_TEXT + "id"),
            body("name").isString().withMessage(INVALID_INPUT_TEXT + "name"),
            body("type").isString().toLowerCase().custom(isProductType).withMessage(INVALID_INPUT_TEXT + "type"),
            body("number").isString().withMessage(INVALID_INPUT_TEXT + "number"),
            body("documents").optional().custom(isDocumentIdArray).withMessage(INVALID_INPUT_TEXT + "documents"),
            body("amount").optional().isFloat({ min:0 }).withMessage(INVALID_INPUT_TEXT + "amount"),
            body("amountUnit").optional().toLowerCase().custom(isAmountUnit).customSanitizer(toAmountUnit).withMessage(INVALID_INPUT_TEXT + "amountUnit"),
            body("weight").optional().isFloat({ min:0 }).withMessage(INVALID_INPUT_TEXT + "weight"),
            body("weightUnit").optional().toLowerCase().custom(isWeightUnit).customSanitizer(toWeightUnit).withMessage(INVALID_INPUT_TEXT + "weightUnit"),
            body("carbonFootprint").optional().isFloat({ min:0 }).withMessage(INVALID_INPUT_TEXT + "carbonFootprint"),
            body("carbonFootprintUnit").optional().toLowerCase().custom(isCarbonFootprintUnit).customSanitizer(toCarbonFootprintUnit).withMessage(INVALID_INPUT_TEXT + "carbonFootprintUnit")
        ],
        middlewares: [ cleanseInputs ],
        service: new PostMyProductService({
            myProductStore: MyProductStore.get(),
        })
    });
}

function toAmountUnit(value: string): unknown {
    return value === "each" ? "each"
         : value === "liter" || value === "l" ? "liter"
         : value === "centimeter" || value === "cm" ? "centimeter"
         : value === "square_centimeter" || value === "cm2" ? "square_centimeter"
         : value === "cubic_centimeter" || value === "cm3" ? "cubic_centimeter"
         : value === "meter" || value === "m" ? "meter"
         : value === "square_meter" || value === "m2" ? "square_meter"
         : value === "cubic_meter" || value === "m3" ? "cubic_meter"
         : "";
}

function toWeightUnit(value: string): unknown {
    return value === "milligram" || value === "mg" ? "milligram"
         : value === "gram" || value === "g" ? "gram"
         : value === "kilogram" || value === "kg" ? "kilogram"
         : value === "percentage" || value === "%" ? "percentage"
         : value === "parts_per_million" || value === "ppm" ? "parts_per_million"
         : "";
}

function toCarbonFootprintUnit(value: string): unknown {
    return value === "milligram" || value === "mg" ? "milligram"
         : value === "gram" || value === "g" ? "gram"
         : value === "kilogram" || value === "kg" ? "kilogram"
         : "";
}

function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody: MyProductParams = {
        name: request.body.name,
        number: request.body.number,
        type: request.body.type,
        amount: request.body.amount,
        amountUnit: request.body.amountUnit,
        carbonFootprint: request.body.carbonFootprint,
        carbonFootprintUnit: request.body.carbonFootprintUnit,
        documents: request.body.documents,
        id: request.body.id,
        uid: request.body.uid,
        weight: request.body.weight,
        weightUnit: request.body.weightUnit
    };

    if (!newBody.uid) {
        newBody.uid = randomUUID();
    }
    if (!newBody.id) {
        newBody.id = newBody.uid;
    }

    request.body = newBody;
    next();
}