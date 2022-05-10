import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ProductStore } from "../../../../storage/product/ProductStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostProductService } from "./PostProductService";


export const postProductRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.product,
    inputPath: "body",
    inputChecks: [
        body("uid").optional().isUUID().withMessage("invalid uid"),
        body("id").optional().isString().withMessage("invalid id"),
        body("name").isString().withMessage("name must be defined"),
        body("type").isString().toLowerCase().custom(isProductType).withMessage("type must be defined and valid"),
        body("number").isString().withMessage("number must be defined and valid"),
        body("documents").optional().custom(isDocumentArray).withMessage("invalid documents"),
        body("amount").optional().isNumeric().withMessage("amount must be defined and valid"),
        body("amount-unit").optional().isString().toLowerCase().custom(isAmountUnit).withMessage("amount-unit must be defined and valid"),
        body("weight").optional().isNumeric().withMessage("weight must be defined and valid"),
        body("weight-unit").optional().toLowerCase().custom(isWeightUnit).withMessage("weight-unit must be defined and valid"),
        body("carbonfootprint").optional().isNumeric().withMessage("carbonfootprint must be defined and valid"),
        body("carbonfootprint-unit").optional().toLowerCase().custom(isCarbonFootprintUnit).withMessage("carbonfootprint-unit must be defined and valid")
    ],
    middlewares: [
        renameParameters
    ],
    service: new PostProductService({
        getProductStore: () => ProductStore.get()
    })
});

function isProductType(value: string): boolean {
    return value.includes("assembly")
        || value.includes("purchasepart")
        || value.includes("standardpart");
}

function isDocumentArray(value: string): boolean {
    if (!Array.isArray(value)) {
        return false;
    }

    for (const id in value) {
        if (!isUUID(id)) {
            return false;
        }
    }

    return true;
}

function isUUID(id: string): boolean {
    const test = "" + id;
    return !test.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
}

function isAmountUnit(value: string): boolean {
    return value.includes("each")
        || value.includes("liter")
        || value.includes("centimeter")
        || value.includes("square_centimeter")
        || value.includes("cubic_centimeter")
        || value.includes("meter")
        || value.includes("square_meter")
        || value.includes("cubic_meter");
}

function isWeightUnit(value: string): boolean {
    return value.includes("mg")
        || value.includes("g")
        || value.includes("kg")
        || value.includes("%")
        || value.includes("ppm");
}

function isCarbonFootprintUnit(value: string): boolean {
    return value.includes("mg")
        || value.includes("g")
        || value.includes("kg");
}

function renameParameters(request: Request, response: Response, next: NextFunction): void {
    request.body.amountUnit = request.body["amount-unit"];
    delete request.body["amount-unit"];

    request.body.weightUnit = request.body["weight-unit"];
    delete request.body["weight-unit"];

    request.body.carbonFootprint = request.body.carbonfootprint;
    delete request.body.carbonfootprint;

    request.body.carbonFootprintUnit = request.body["carbonfootprint-unit"];
    delete request.body["carbonfootprint-unit"];

    next();
}