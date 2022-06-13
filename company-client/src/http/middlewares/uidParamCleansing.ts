import { NextFunction, Request, Response } from "express";


export function cleanseUidParam(request: Request, response: Response, next: NextFunction): void {
    const newQuery = <{uid?: string}> {};
    if (request.query.uid) {
        newQuery.uid = <string> request.query.uid;
    }

    request.query = newQuery;
    next();
}