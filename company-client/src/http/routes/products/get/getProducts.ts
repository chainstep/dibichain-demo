import { Router } from "express";
import { query } from "express-validator";
import { ProductStore } from "../../../../storage/product/ProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetProductsService } from "./GetProductsService";


export function createGetProductsRouter(): Router {
    return createRouter({
        method: "get",
        route: ROUTE_NAMES.products,
        inputPath: "query",
        inputChecks: [
            query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
        ],
        middlewares: [ cleanseUidQueryInput ],
        service: new GetProductsService({
            getProductStore: () => ProductStore.get()
        })
    });
}