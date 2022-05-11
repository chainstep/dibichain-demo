import { body } from "express-validator";
import { ProductStore } from "../../../../storage/product/ProductStore";
import { ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetProductService } from "./GetProductService";


export const getProductRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.product,
    inputPath: "query",
    inputChecks: [
        body("uid").optional().isUUID().withMessage("invalid uid")
    ],
    service: new GetProductService({
        getProductStore: () => ProductStore.get()
    })
});