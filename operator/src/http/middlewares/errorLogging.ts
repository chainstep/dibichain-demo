import { logger } from "../../utils/logger";
import { NextFunction, Request, Response } from "express";


export function logErrors(error: Error, request: Request, response: Response, next: NextFunction): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statusCode = (<any> error).statusCode;
    if (statusCode !== 404) {
        logger.http(error.message);
    }
    next(error);
}