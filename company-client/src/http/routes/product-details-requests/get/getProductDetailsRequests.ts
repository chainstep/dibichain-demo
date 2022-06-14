import { query } from "express-validator";
import { ProductDetailsRequestStore } from "../../../../storage/product-details-request/ProductDetailsRequestStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../routerFactory";
import { GetProductDetailsRequestsService } from "./GetProductDetailsRequestsService";


export const getProductDetailsRequestsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.productDetailsRequests,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    middlewares: [ cleanseUidQueryInput ],
    service: new GetProductDetailsRequestsService({
        getProductDetailsRequestStore: () => ProductDetailsRequestStore.get()
    })
});