import { query } from "express-validator";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetMyProductsService } from "./GetMyProductsService";


export const getMyProductsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.myProducts,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    service: new GetMyProductsService({
        getMyProductStore: () => MyProductStore.get()
    })
});