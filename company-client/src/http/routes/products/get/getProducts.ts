import { query } from "express-validator";
import { ProductStore } from "../../../../storage/product/ProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetProductsService } from "./GetProductsService";


export const getProductsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.products,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    service: new GetProductsService({
        getProductStore: () => ProductStore.get()
    })
});