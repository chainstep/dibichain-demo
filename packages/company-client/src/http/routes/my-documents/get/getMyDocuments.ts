import { Router } from "express";
import { query } from "express-validator";
import { MyDocumentStore } from "../../../../storage/my-document/MyDocumentStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetMyDocumentsService } from "./GetMyDocumentsService";


export function createGetMyDocumentsRouter(): Router {
    return createRouter({
        method: "get",
        route: "/my-documents",
        inputPath: "query",
        inputChecks: [
            query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
        ],
        middlewares: [ cleanseUidQueryInput ],
        service: new GetMyDocumentsService({
            myDocumentStore: MyDocumentStore.get()
        })
    });
}