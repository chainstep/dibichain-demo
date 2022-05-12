import { body } from "express-validator";
import { ProductStore } from "../../../../storage/product/ProductStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostProductService } from "./PostProductService";


export const postProductRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.products,
    inputPath: "body",
    inputChecks: [
        body("uid").optional().isUUID().withMessage("invalid uid"),
        body("id").optional().isString().withMessage("invalid id"),
        body("name").isString().withMessage("name must be defined"),
        body("type").isString().toLowerCase().custom(isProductType).withMessage("type must be defined and valid"),
        body("number").isString().withMessage("number must be defined and valid"),
        body("documents").optional().custom(isDocumentArray).withMessage("invalid documents"),
        body("amount").optional().isNumeric().withMessage("amount must be defined and valid"),
        body("amountUnit").optional().isString().toLowerCase().custom(isAmountUnit).withMessage("amountUnit must be defined and valid"),
        body("weight").optional().isNumeric().withMessage("weight must be defined and valid"),
        body("weightUnit").optional().toLowerCase().custom(isWeightUnit).withMessage("weightUnit must be defined and valid"),
        body("carbonFootprint").optional().isNumeric().withMessage("carbonFootprint must be defined and valid"),
        body("carbonFootprintUnit").optional().toLowerCase().custom(isCarbonFootprintUnit).withMessage("carbonFootprintUnit must be defined and valid")
    ],
    service: new PostProductService({
        getProductStore: () => ProductStore.get()
    })
});

function isProductType(value: string): boolean {
    return value.includes("assembly")
        || value.includes("purchase_part")
        || value.includes("standard_part");
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