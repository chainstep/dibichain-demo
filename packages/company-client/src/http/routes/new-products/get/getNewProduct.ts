import { Router } from "express";
import { query } from "express-validator";
import { NewProductStore } from "../../../../storage/new-product/NewProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetNewProductsService } from "./GetNewProductsService";


export function createGetNewProductsRouter(): Router {
    return createRouter({
        method: "get",
        route: ROUTE_NAMES.newProducts,
        inputPath: "query",
        inputChecks: [
            query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
        ],
        middlewares: [ cleanseUidQueryInput ],
        service: new GetNewProductsService({
            newProductStore: NewProductStore.get()
        })
    });
}