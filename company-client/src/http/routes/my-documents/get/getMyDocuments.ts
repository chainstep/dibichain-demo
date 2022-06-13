import { query } from "express-validator";
import { MyDocumentStore } from "../../../../storage/my-document/MyDocumentStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { cleanseUidParam } from "../../../middlewares/uidParamCleansing";
import { createRouter } from "../../routerFactory";
import { GetMyDocumentsService } from "./GetMyDocumentsService";


export const getMyDocumentsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.myDocuments,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    middlewares: [ cleanseUidParam ],
    service: new GetMyDocumentsService({
        getMyDocumentStore: () => MyDocumentStore.get()
    })
});