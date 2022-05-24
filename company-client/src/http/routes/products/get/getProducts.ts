import { body } from "express-validator";
import { ProductStore } from "../../../../storage/product/ProductStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetProductsService } from "./GetProductsService";


export const getProductsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.products,
    inputPath: "query",
    inputChecks: [
        body("uid").optional().isUUID().withMessage("invalid uid")
    ],
    service: new GetProductsService({
        getProductStore: () => ProductStore.get()
    })
});