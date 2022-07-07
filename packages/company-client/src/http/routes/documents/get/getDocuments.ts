import { Router } from "express";
import { query } from "express-validator";
import { DocumentStore } from "../../../../storage/document/DocumentStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetDocumentsService } from "./GetDocumentsService";


/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Get documents
 *     description: This route lets you retrieve requested documents from the company client
 *     tags: [Documents]
 *     parameters:
 *       - in: query
 *         name: uid
 *         description: The uid of the document. Returns all documents if no uid is provided
 *         schema:
 *           type: string
 *         example: 8181c8ae-eef1-4703-8498-2cf25be2877b
 *     responses:
 *       200:
 *         description: the list of documents
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 */
export function createGetDocumentsRouter(): Router {
    return createRouter({
        method: "get",
        route: "/documents",
        inputPath: "query",
        inputChecks: [
            query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
        ],
        middlewares: [ cleanseUidQueryInput ],
        service: new GetDocumentsService({
            documentStore: DocumentStore.get()
        })
    });
}