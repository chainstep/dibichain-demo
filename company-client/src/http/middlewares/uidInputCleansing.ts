import { NextFunction, Request, Response } from "express";


export function cleanseUidQueryInput(request: Request, response: Response, next: NextFunction): void {
    const newQuery: {uid?: string} = {};
    if (request.query.uid) {
        newQuery.uid = <string> request.query.uid;
    }

    request.query = newQuery;
    next();
}

export function cleanseUidBodyInput(request: Request, response: Response, next: NextFunction): void {
    const newBody: {uid?: string} = {};
    if (request.body.uid) {
        newBody.uid = <string> request.body.uid;
    }

    request.body = newBody;
    next();
}