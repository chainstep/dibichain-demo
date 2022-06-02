import { body } from "express-validator";
import { Contracts } from "../../../../contract/Contracts";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostNewProductService } from "./PostNewProductService";


export const postNewProductRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.newProducts,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
        body("id").isString().withMessage(INVALID_INPUT_TEXT + "id"),
        body("name").isString().withMessage(INVALID_INPUT_TEXT + "name"),
        body("type").isString().toLowerCase().custom(isProductType).withMessage(INVALID_INPUT_TEXT + "type"),
        body("number").isString().withMessage(INVALID_INPUT_TEXT + "number"),
        body("hash").isHash("sha256").withMessage(INVALID_INPUT_TEXT + "hash")
    ],
    service: new PostNewProductService({
        getEventBus: () => Contracts.getEventBus()
    })
});

function isProductType(value: string): boolean {
    return value.includes("assembly")
        || value.includes("purchase_part")
        || value.includes("standard_part");
}