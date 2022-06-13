import { NextFunction, Request, Response } from "express";
import { query } from "express-validator";
import { ProductStore } from "../../../../storage/product/ProductStore";
import { INVALID_INPUT_TEXT, ROUTE_NAMES } from "../../../constants";
import { createRouter } from "../../routerFactory";
import { GetProductsService } from "./GetProductsService";


export const getProductsRouter = createRouter({
    method: "get",
    route: ROUTE_NAMES.products,
    inputPath: "query",
    inputChecks: [
        query("uid").optional().isUUID().withMessage(INVALID_INPUT_TEXT + "uid")
    ],
    middlewares: [ cleanseParams ],
    service: new GetProductsService({
        getProductStore: () => ProductStore.get()
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