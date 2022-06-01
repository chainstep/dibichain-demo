import { query } from "express-validator";
import { MyNewProductStore } from "../../../../storage/my-new-product/MyNewProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetMyNewProductsService } from "./GetMyNewProductsService";


export const getMyNewProductsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.myNewProducts,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    service: new GetMyNewProductsService({
        getMyNewProductStore: () => MyNewProductStore.get()
    })
});