import { initHttpServer } from "./http/http";
import { EnvVars, RUN_CONTEXT } from "./lib/EnvVars";
import { ConsoleTransport, initLogger, logger } from "./utils/logger";


async function main(): Promise<void> {
    const isDevContext = EnvVars.RUN_CONTEXT === RUN_CONTEXT.DEVELOPMENT;

    initLogger({
        level: isDevContext ? "all" : "http",
        transports: [
            new ConsoleTransport()
        ]
    });

    logger.info("Init http server...");
    const server = initHttpServer();

    logger.info("Start server...");
    server.listen(EnvVars.PORT, () => {
        logger.info(`Listening on port ${EnvVars.PORT}...`);
    });
}

main();