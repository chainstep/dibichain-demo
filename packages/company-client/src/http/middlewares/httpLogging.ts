import morgan from "morgan";
import { logger } from "../../utils/logger";


export const logHttp = morgan(
    ":method :status :response-time ms :url",
    {
        stream: {
            write: message => logger.http(message.trim())
        }
    }
);