import { Router } from "express";
import { query } from "express-validator";
import { MyDocumentStore } from "../../../../storage/my-document/MyDocumentStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { cleanseUidQueryInput } from "../../../middlewares/uidInputCleansing";
import { createRouter } from "../../../routerFactory";
import { GetMyDocumentsService } from "./GetMyDocumentsService";


/**
 * @swagger
 * /my-documents:
 *   get:
 *     summary: Get my documents
 *     description: This route lets you retrieve your documents from the company client
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
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     myDocuments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Document'
 */
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