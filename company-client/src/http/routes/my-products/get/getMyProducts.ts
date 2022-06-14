import { Router } from "express";
import { query } from "express-validator";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetMyProductsService } from "./GetMyProductsService";


export function createGetMyProductsRouter(): Router {
    return createRouter({
        method: "get",
        route: ROUTE_NAMES.myProducts,
        inputPath: "query",
        inputChecks: [
            query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
        ],
        middlewares: [ cleanseUidQueryInput ],
        service: new GetMyProductsService({
            getMyProductStore: () => MyProductStore.get()
        })
    });
}