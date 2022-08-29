import { validateRequest } from "@atz3n/express-utils";
import express, { NextFunction, Request, Response, Router } from "express";
import { ValidationChain } from "express-validator";


export interface RouteService {
    run(inputs: unknown, request?: Request, response?: Response): Promise<unknown>
}


export interface RouterParams {
    method: "post" | "get" | "put" | "delete";
    route: string;
    inputPath?: "query" | "body";
    inputChecks?: ValidationChain[];
    middlewares?: ((request: Request, response: Response, next: NextFunction) => void)[];
    successCode?: number;
    service: RouteService
}


export function createRouter(params: RouterParams): Router {
    const { method, route, inputPath, inputChecks, service, middlewares, successCode } = params;
    const router = express.Router();

    router[method](route, inputChecks || [], ...[validateRequest], [...middlewares || []],
        async (request: Request, response: Response) => {
           const inputs = inputPath === "body" ? request.body
                        : inputPath === "query" ? request.query
                        : undefined;
            response.status(successCode || 200).send({
                data: await service.run(inputs, request, response)
            });
        }
    );
    return router;
}