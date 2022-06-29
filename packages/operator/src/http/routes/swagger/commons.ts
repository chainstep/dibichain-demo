import { EnvVars, RUN_CONTEXT } from "../../../lib/EnvVars";


export const commons = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dibichain Operator",
            version: "1.0.0",
            description: "The Dibichain Operator",
            contact: {
                name: "CHAINSTEP",
                url: "https://chainstep.com",
            },
        },
    },
    apis: EnvVars.RUN_CONTEXT === RUN_CONTEXT.DEVELOPMENT
        ? [ "./dev/compiled/*.js" ]
        : [ "./dist/src/http/routes/**/*.js" ],
};
