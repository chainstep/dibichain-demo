import { query } from "express-validator";
import { MyDocumentStore } from "../../../../storage/my-document/MyDocumentStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../routerFactory";
import { GetMyDocumentsService } from "./GetMyDocumentsService";


export const getMyDocumentsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.myDocuments,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    middlewares: [ cleanseUidQueryInput ],
    service: new GetMyDocumentsService({
        getMyDocumentStore: () => MyDocumentStore.get()
    })
});