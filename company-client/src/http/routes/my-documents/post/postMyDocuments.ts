import { body } from "express-validator";
import { MyDocumentStore } from "../../../../storage/my-document/MyDocumentStore";
import { MyDocument } from "../../../../types";
import { isUUID } from "../../../../utils/propertyCheckers";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { PostMyDocumentsService } from "./PostMyDocumentsService";


export const postMyDocumentsRouter = createRouter({
    method: "post",
    route: ROUTE_NAMES.myDocuments,
    inputPath: "body",
    inputChecks: [
        body("myDocuments").custom(isDocumentArray).withMessage(INVALID_INPUT_TEXT + "myDocuments"),
    ],
    service: new PostMyDocumentsService({
        getMyDocumentStore: () => MyDocumentStore.get(),
    })
});

function isDocumentArray(value: string): boolean {
    if (!Array.isArray(value)) {
        return false;
    }

    for (let i = 0 ; i < value.length ; i++) {
        const myDocument = <MyDocument> value[i];
        if (!isMyDocumentType(myDocument)) {
            return false;
        }
    }
    return true;
}

function isMyDocumentType(myDocument: MyDocument) {
    return typeof myDocument.data === "string" &&
        typeof myDocument.name === "string" &&
        typeof myDocument.type === "string" &&
        typeof myDocument.uid === "string" &&
        isUUID(myDocument.uid) &&
        typeof myDocument.uploaded === "number" &&
        typeof myDocument.version === "string";
}