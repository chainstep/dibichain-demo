import dotenv from "dotenv";


export enum RUN_CONTEXT {
    PRODUCTION,
    DEVELOPMENT,
    TEST
}


export class EnvVars {
    private static isInitialized = false;

    public static RUN_CONTEXT = RUN_CONTEXT.PRODUCTION;
    public static PORT = 0;
    public static ALLOWED_ORIGINS: string[] = [];
    public static GREETER_CONTRACT_ADDRESS = "";
    public static RPC_URL = "";
    public static MONGO_DB_URL = "";
    public static MAX_REQUESTS_PER_15_MIN = 0;


    public static load(): void {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;

        this.set_RUN_CONTEXT();
        this.set_ALLOWED_ORIGINS();

        this.setVar("RPC_URL", (envVar) => {
            this.RPC_URL = <string> envVar;
        });
        this.setVar("GREETER_CONTRACT_ADDRESS", (envVar) => {
            this.GREETER_CONTRACT_ADDRESS = <string> envVar;
        });
        this.setVar("MONGO_DB_URL", (envVar) => {
            this.MONGO_DB_URL = <string> envVar;
        });
        this.setVar("PORT", (envVar) => {
            this.PORT = Number(envVar);
        }, 3000);
    }

    private static set_RUN_CONTEXT(): void {
        if (process.env.RUN_CONTEXT === "development") {
            this.RUN_CONTEXT = RUN_CONTEXT.DEVELOPMENT;
            dotenv.config();
        } else if (process.env.RUN_CONTEXT === "test") {
            this.RUN_CONTEXT = RUN_CONTEXT.TEST;
            dotenv.config({ path: __dirname + "/../../test/.env-test" });
        } else {
            dotenv.config();
        }
    }

    private static set_ALLOWED_ORIGINS(): void {
        if (!process.env.ALLOWED_ORIGINS) {
            this.ALLOWED_ORIGINS = [];
        } else {
            this.ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim());
        }
    }

    private static setVar(envVarName: string, cb: (variable: unknown) => void, defaultVar?: unknown): void {
        if (process.env[envVarName]) {
            cb(process.env[envVarName]);
        } else if (defaultVar !== undefined) {
            cb(defaultVar);
        } else {
            throw new Error(`${envVarName} must be defined`);
        }
    }
}

EnvVars.load();