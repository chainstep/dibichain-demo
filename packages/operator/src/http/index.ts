import { errorHandler, NotFoundError, validateOrigin } from "@atz3n/express-utils";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { createServer, Server } from "http";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { EnvVars, RUN_CONTEXT } from "../lib/EnvVars";
import { logErrors } from "./middlewares/errorLogging";
import { logHttp } from "./middlewares/httpLogging";
import { createPostNewProductRouter } from "./routes/new-products/post/postNewProduct";
import { createPostProductDetailsRequestRouter } from "./routes/product-details-request/post/postProductDetailsRequest";
import { createGetProductDetailsResponseRouter } from "./routes/product-details-response/get/getProductDetailsResponses";
import { createPostProductDetailsResponseRouter } from "./routes/product-details-response/post/postProductDetailsResponse";
import { commons } from "./routes/swagger/commons";


export function initHttpServer(): Server {
    const httpServer = express();

    if (EnvVars.RUN_CONTEXT !== RUN_CONTEXT.TEST) {
        httpServer.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(commons)));
    }

    httpServer.use(logHttp);
    httpServer.use(helmet());
    httpServer.use(cors());
    httpServer.use(json({ limit: "50mb" }));
    httpServer.use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: EnvVars.MAX_REQUESTS_PER_15_MIN,
        standardHeaders: true
    }));
    httpServer.use(validateOrigin(EnvVars.ALLOWED_ORIGINS));

    httpServer.use(createPostNewProductRouter());
    httpServer.use(createPostProductDetailsRequestRouter());
    httpServer.use(createPostProductDetailsResponseRouter());
    httpServer.use(createGetProductDetailsResponseRouter());

    httpServer.all("*", (request, response) => {
    throw new NotFoundError();
    });

    httpServer.use(logErrors);
    httpServer.use(errorHandler);

    return createServer(httpServer);
}