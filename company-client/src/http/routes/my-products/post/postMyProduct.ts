import { body } from "express-validator";
import { EnvVars } from "../../../../lib/EnvVars";
import { Operator } from "../../../../lib/Operator";
import { MyProductStore } from "../../../../storage/myProduct/MyProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostMyProductService } from "./PostMyProductService";


export const postMyProductRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.myProducts,
    inputPath: "body",
    inputChecks: [
        body("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
        body("id").optional().isString().withMessage(INVALID_INPUT_TEXT + "id"),
        body("name").isString().withMessage(INVALID_INPUT_TEXT + "name"),
        body("type").isString().toLowerCase().custom(isProductType).withMessage(INVALID_INPUT_TEXT + "type"),
        body("number").isString().withMessage(INVALID_INPUT_TEXT + "number"),
        body("documents").optional().custom(isDocumentArray).withMessage(INVALID_INPUT_TEXT + "documents"),
        body("amount").optional().isNumeric().withMessage(INVALID_INPUT_TEXT + "amount"),
        body("amountUnit").optional().isString().toLowerCase().custom(isAmountUnit).withMessage(INVALID_INPUT_TEXT + "amountUnit"),
        body("weight").optional().isNumeric().withMessage(INVALID_INPUT_TEXT + "weight"),
        body("weightUnit").optional().toLowerCase().custom(isWeightUnit).withMessage(INVALID_INPUT_TEXT + "weightUnit"),
        body("carbonFootprint").optional().isNumeric().withMessage(INVALID_INPUT_TEXT + "carbonFootprint"),
        body("carbonFootprintUnit").optional().toLowerCase().custom(isCarbonFootprintUnit).withMessage(INVALID_INPUT_TEXT + "carbonFootprintUnit")
    ],
    service: new PostMyProductService({
        getMyProductStore: () => MyProductStore.get(),
        operator: new Operator({
            url: EnvVars.OPERATOR_URL
        })
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