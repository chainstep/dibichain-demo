import { body } from "express-validator";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostProductService } from "./PostProductService";


const missingOrInvalidText = "missing or invalid";

export const postProductRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.products,
    inputPath: "body",
    inputChecks: [
        body("uid").isUUID().withMessage(missingOrInvalidText + " uid"),
        body("id").isString().withMessage(missingOrInvalidText + " id"),
        body("name").isString().withMessage(missingOrInvalidText + " name"),
        body("type").isString().toLowerCase().custom(isProductType).withMessage(missingOrInvalidText + " type"),
        body("number").isString().withMessage(missingOrInvalidText + " number"),
        body("hash").isHash("sha256").withMessage(missingOrInvalidText + " hash")
    ],
    service: new PostProductService({

    })
});

function isProductType(value: string): boolean {
    return value.includes("assembly")
        || value.includes("purchase_part")
        || value.includes("standard_part");
}