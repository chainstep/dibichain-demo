import { query } from "express-validator";
import { MyProductDetailsRequestStore } from "../../../../storage/myProductDetailsRequest/MyProductDetailsRequestStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetMyProductDetailsRequestsService } from "./GetMyProductDetailsRequestsService";


export const getMyProductDetailsRequestsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.myProductDetailsRequests,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    service: new GetMyProductDetailsRequestsService({
        getMyProductDetailsRequestStore: () => MyProductDetailsRequestStore.get()
    })
});