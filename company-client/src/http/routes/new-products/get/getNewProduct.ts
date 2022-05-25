import { query } from "express-validator";
import { NewProductStore } from "../../../../storage/newProduct/NewProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetNewProductsService } from "./GetNewProductsService";


export const getNewProductsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.newProducts,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    service: new GetNewProductsService({
        getNewProductStore: () => NewProductStore.get()
    })
});