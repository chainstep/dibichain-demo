import { body } from "express-validator";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { isProductType, isAmountUnit, isWeightUnit, isCarbonFootprintUnit, isDocumentIdArray } from "../../../../utils/propertyCheckers";
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
        body("documents").optional().custom(isDocumentIdArray).withMessage(INVALID_INPUT_TEXT + "documents"),
        body("amount").optional().isNumeric().withMessage(INVALID_INPUT_TEXT + "amount"),
        body("amountUnit").optional().isString().toLowerCase().custom(isAmountUnit).withMessage(INVALID_INPUT_TEXT + "amountUnit"),
        body("weight").optional().isNumeric().withMessage(INVALID_INPUT_TEXT + "weight"),
        body("weightUnit").optional().toLowerCase().custom(isWeightUnit).withMessage(INVALID_INPUT_TEXT + "weightUnit"),
        body("carbonFootprint").optional().isNumeric().withMessage(INVALID_INPUT_TEXT + "carbonFootprint"),
        body("carbonFootprintUnit").optional().toLowerCase().custom(isCarbonFootprintUnit).withMessage(INVALID_INPUT_TEXT + "carbonFootprintUnit")
    ],
    service: new PostMyProductService({
        getMyProductStore: () => MyProductStore.get(),
    })
});