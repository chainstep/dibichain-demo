import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { MyDocumentStore } from "../../../../storage/my-document/MyDocumentStore";
import { MyDocument } from "../../../../types";
import { isUUID } from "../../../../utils/propertyCheckers";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostMyDocumentsService } from "./PostMyDocumentsService";


interface MyDocumentParams extends Omit<MyDocument, "timestamp"> {
    timestamp?: number;
    uploaded?: number;
}


/**
 * @swagger
 * /my-documents:
 *   post:
 *     summary: Post a new document
 *     description: This route lets you add a new document to the company client
 *     tags: [Documents]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export function createPostMyDocumentsRouter(): Router {
    return createRouter({
        method: "post",
        route: "/my-documents",
        inputPath: "body",
        inputChecks: [
            body("myDocuments").custom(isDocumentArray).withMessage(INVALID_INPUT_TEXT + "myDocuments"),
        ],
        middlewares: [ cleanseInputs ],
        service: new PostMyDocumentsService({
            myDocumentStore: MyDocumentStore.get()
        })
    });
}

function isDocumentArray(value: string): boolean {
    if (!Array.isArray(value)) {
        return false;
    }

    for (let i = 0 ; i < value.length ; i++) {
        const myDocument = <MyDocumentParams> value[i];
        if (!isMyDocumentType(myDocument)) {
            return false;
        }
    }
    return true;
}

function isMyDocumentType(myDocument: MyDocumentParams) {
    return typeof myDocument.data === "string"
        && typeof myDocument.name === "string"
        && typeof myDocument.type === "string"
        && typeof myDocument.uid === "string"
        && isUUID(myDocument.uid)
        && typeof myDocument.version === "string"
        && (typeof myDocument.timestamp === "number" || typeof myDocument.uploaded === "number");
}

function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody = {
        myDocuments: <MyDocument[]> []
    };

    (<MyDocumentParams[]> request.body.myDocuments).forEach((myDocument) => {
        newBody.myDocuments.push({
            data: myDocument.data,
            name: myDocument.name,
            type: myDocument.type,
            uid: myDocument.uid,
            version: myDocument.version,
            timestamp: myDocument.timestamp || myDocument.uploaded || 0,
        });
    });

    request.body = newBody;
    next();
}