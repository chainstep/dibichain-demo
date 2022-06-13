import { NextFunction, Request, Response } from "express";
import { query } from "express-validator";
import { DocumentStore } from "../../../../storage/document/DocumentStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetDocumentsService } from "./GetDocumentsService";


export const getDocumentsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.documents,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    middlewares: [ cleanseParams ],
    service: new GetDocumentsService({
        getDocumentStore: () => DocumentStore.get()
    })
});

function cleanseParams(request: Request, response: Response, next: NextFunction): void {
    const newQuery = <{uid?: string}> {};
    if (request.query.uid) {
        newQuery.uid = <string> request.query.uid;
    }

    request.query = newQuery;
    next();
}