import { errorHandler, NotFoundError, validateOrigin } from "@atz3n/express-utils";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { createServer, Server } from "http";
import { EnvVars } from "../lib/EnvVars";
import { logErrors } from "./middlewares/errorLogging";
import { logHttp } from "./middlewares/httpLogging";
import { getMyProductDetailsRequestsRouter } from "./routes/my-product-details-requests/get/getMyProductDetailsRequests";
import { postMyProductDetailsRequestRouter } from "./routes/my-product-details-requests/post/postMyProductDetailsRequest";
import { getMyProductsRouter } from "./routes/my-products/get/getMyProducts";
import { postMyProductRouter } from "./routes/my-products/post/postMyProduct";
import { getNewProductsRouter } from "./routes/new-products/get/getNewProduct";


export const httpServer = express();

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

httpServer.use(postMyProductRouter);
httpServer.use(getMyProductsRouter);
httpServer.use(getNewProductsRouter);
httpServer.use(postMyProductDetailsRequestRouter);
httpServer.use(getMyProductDetailsRequestsRouter);

httpServer.all("*", (request, response) => {
  throw new NotFoundError();
});

httpServer.use(logErrors);
httpServer.use(errorHandler);

export function initHttpServer(): Server {
    return createServer(httpServer);
}