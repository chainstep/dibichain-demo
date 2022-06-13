import { NextFunction, Request, Response } from "express";
import { query } from "express-validator";
import { MyProductStore } from "../../../../storage/my-product/MyProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetMyProductsService } from "./GetMyProductsService";


export const getMyProductsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.myProducts,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    middlewares: [ cleanseParams ],
    service: new GetMyProductsService({
        getMyProductStore: () => MyProductStore.get()
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