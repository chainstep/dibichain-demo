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
import { postProductDetailsRequestRouter } from "./routes/product-details-request/post/postProductDetailsRequest";
import { getProductDetailsResponseRouter } from "./routes/product-details-response/get/GetProductDetailsResponses";
import { postProductDetailsResponseRouter } from "./routes/product-details-response/post/postProductDetailsResponse";
import { postNewProductRouter } from "./routes/new-products/post/postNewProduct";


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

httpServer.use(postNewProductRouter);
httpServer.use(postProductDetailsRequestRouter);
httpServer.use(postProductDetailsResponseRouter);
httpServer.use(getProductDetailsResponseRouter);

httpServer.all("*", (request, response) => {
  throw new NotFoundError();
});

httpServer.use(logErrors);
httpServer.use(errorHandler);

export function initHttpServer(): Server {
    return createServer(httpServer);
}