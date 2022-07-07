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
 *     description: This route lets you add a new product to the company client
 *     tags: [Products]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
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