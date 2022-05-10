import { NotAuthorizedError } from "@atz3n/express-utils";
import { NextFunction, Request, Response } from "express";


export function checkOrigin(origins: string[]): (request: Request, response: Response, next: NextFunction) => void {
    return (request: Request, response: Response, next: NextFunction) => {
        const origin = request.headers.origin;
        if (origins.length !== 0 && (!origin || !origins.includes(origin))) {
            throw new NotAuthorizedError();
        }
        next();
    };
}