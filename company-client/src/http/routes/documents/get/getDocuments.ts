import { query } from "express-validator";
import { DocumentStore } from "../../../../storage/document/DocumentStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../routerFactory";
import { GetDocumentsService } from "./GetDocumentsService";


export const getDocumentsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.documents,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    middlewares: [ cleanseUidQueryInput ],
    service: new GetDocumentsService({
        getDocumentStore: () => DocumentStore.get()
    })
});