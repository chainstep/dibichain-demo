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
import { createGetDocumentsRouter } from "./routes/documents/get/getDocuments";
import { createGetMyDocumentsRouter } from "./routes/my-documents/get/getMyDocuments";
import { createPostMyDocumentsRouter } from "./routes/my-documents/post/postMyDocuments";
import { createGetMyNewProductsRouter } from "./routes/my-new-products/get/getMyNewProduct";
import { createPostMyNewProductRouter } from "./routes/my-new-products/post/postMyNewProduct";
import { createGetMyProductDetailsRequestsRouter } from "./routes/my-product-details-requests/get/getMyProductDetailsRequests";
import { createPostMyProductDetailsRequestRouter } from "./routes/my-product-details-requests/post/postMyProductDetailsRequest";
import { createPostMyProductDetailsResponsesRouter } from "./routes/my-product-details-responses/post/postMyProductDetailsResponse";
import { createGetMyProductsRouter } from "./routes/my-products/get/getMyProducts";
import { createPostMyProductRouter } from "./routes/my-products/post/postMyProduct";
import { createGetNewProductsRouter } from "./routes/new-products/get/getNewProduct";
import { createGetProductDetailsRequestsRouter } from "./routes/product-details-requests/get/getProductDetailsRequests";
import { createGetProductsRouter } from "./routes/products/get/getProducts";
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

    httpServer.use(createPostMyProductRouter());
    httpServer.use(createGetMyProductsRouter());
    httpServer.use(createGetProductsRouter());
    httpServer.use(createGetNewProductsRouter());
    httpServer.use(createGetMyNewProductsRouter());
    httpServer.use(createPostMyNewProductRouter());
    httpServer.use(createPostMyProductDetailsRequestRouter());
    httpServer.use(createGetMyProductDetailsRequestsRouter());
    httpServer.use(createGetProductDetailsRequestsRouter());
    httpServer.use(createPostMyProductDetailsResponsesRouter());
    httpServer.use(createPostMyDocumentsRouter());
    httpServer.use(createGetMyDocumentsRouter());
    httpServer.use(createGetDocumentsRouter());

    httpServer.all("*", (request, response) => {
        throw new NotFoundError();
    });

    httpServer.use(logErrors);
    httpServer.use(errorHandler);

    return createServer(httpServer);
}