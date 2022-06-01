import { body } from "express-validator";
import { Contracts } from "../../../../contract/Contracts";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostProductService } from "./PostProductService";


export const postProductRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.products,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(INVALID_INPUT_TEXT + "uid"),
        body("id").isString().withMessage(INVALID_INPUT_TEXT + "id"),
        body("name").isString().withMessage(INVALID_INPUT_TEXT + "name"),
        body("type").isString().toLowerCase().custom(isProductType).withMessage(INVALID_INPUT_TEXT + "type"),
        body("number").isString().withMessage(INVALID_INPUT_TEXT + "number"),
        body("hash").isHash("sha256").withMessage(INVALID_INPUT_TEXT + "hash")
    ],
    service: new PostProductService({
        getEventBus: () => Contracts.getEventBus()
    })
});

function isProductType(value: string): boolean {
    return value.includes("assembly")
        || value.includes("purchase_part")
        || value.includes("standard_part");
}