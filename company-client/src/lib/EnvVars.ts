import dotenv from "dotenv";


export enum RUN_CONTEXT {
    PRODUCTION,
    DEVELOPMENT,
    DEVELOPMENT_1,
    DEVELOPMENT_2,
    TEST
}


export class EnvVars {
    private static isInitialized = false;

    public static RUN_CONTEXT = RUN_CONTEXT.PRODUCTION;
    public static PORT = 0;
    public static ALLOWED_ORIGINS: string[] = [];
    public static MONGO_DB_URL = "";
    public static USE_MONGO_DB = false;
    public static MAX_REQUESTS_PER_15_MIN = 0;
    public static OPERATOR_URL = "";
    public static RPC_URL = "";
    public static WS_RPC_CONNECTION_CHECK_INTERVAL_SEC = 0;
    public static WS_RPC_CONNECTION_CHECK_TIMEOUT_SEC = 0;
    public static WS_RPC_KEEP_ALIVE_INTERVAL_SEC = 0;
    public static WS_RPC_RECONNECT_DELAY_SEC = 0;
    public static CATCH_UP_ALL_CONTRACT_EVENTS = false;
    public static EVENT_BUS_CONTRACT_ADDRESS = "";
    public static PRODUCT_DETAILS_REQUEST_TIMEOUT_MIN = 0;


    public static load(): void {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;

        this.set_RUN_CONTEXT();
        this.set_ALLOWED_ORIGINS();

        this.setVar("MONGO_DB_URL", (envVar) => {
            this.MONGO_DB_URL = String(envVar);
        });
        this.setVar("USE_MONGO_DB", (envVar) => {
            this.USE_MONGO_DB = this.Boolean(envVar);
        }, false);
        this.setVar("PORT", (envVar) => {
            this.PORT = Number(envVar);
        }, 3000);
        this.setVar("MAX_REQUESTS_PER_15_MIN", (envVar) => {
            this.MAX_REQUESTS_PER_15_MIN = Number(envVar);
        }, 1000);
        this.setVar("OPERATOR_URL", (envVar) => {
            this.OPERATOR_URL = String(envVar);
        });
        this.setVar("RPC_URL", (envVar) => {
            this.RPC_URL = String(envVar);
        });
        this.setVar("WS_RPC_CONNECTION_CHECK_INTERVAL_SEC", (envVar) => {
            this.WS_RPC_CONNECTION_CHECK_INTERVAL_SEC = Number(envVar);
        }, 15);
        this.setVar("WS_RPC_CONNECTION_CHECK_TIMEOUT_SEC", (envVar) => {
            this.WS_RPC_CONNECTION_CHECK_TIMEOUT_SEC = Number(envVar);
        }, 20);
        this.setVar("WS_RPC_KEEP_ALIVE_INTERVAL_SEC", (envVar) => {
            this.WS_RPC_KEEP_ALIVE_INTERVAL_SEC = Number(envVar);
        }, 5 * 60);
        this.setVar("WS_RPC_RECONNECT_DELAY_SEC", (envVar) => {
            this.WS_RPC_RECONNECT_DELAY_SEC = Number(envVar);
        }, 2);
        this.setVar("CATCH_UP_ALL_CONTRACT_EVENTS", (envVar) => {
            this.CATCH_UP_ALL_CONTRACT_EVENTS = this.Boolean(envVar);
        }, false);
        this.setVar("EVENT_BUS_CONTRACT_ADDRESS", (envVar) => {
            this.EVENT_BUS_CONTRACT_ADDRESS = String(envVar);
        });
        this.setVar("PRODUCT_DETAILS_REQUEST_TIMEOUT_MIN", (envVar) => {
            this.PRODUCT_DETAILS_REQUEST_TIMEOUT_MIN = Number(envVar);
        }, 24 * 60);
    }

    private static set_RUN_CONTEXT(): void {
        if (process.env.RUN_CONTEXT === "development") {
            this.RUN_CONTEXT = RUN_CONTEXT.DEVELOPMENT;
            dotenv.config();
        } else if (process.env.RUN_CONTEXT === "development-1") {
            this.RUN_CONTEXT = RUN_CONTEXT.DEVELOPMENT;
            dotenv.config({ path: __dirname + "/../../.env-dev-1" });
        } else if (process.env.RUN_CONTEXT === "development-2") {
            this.RUN_CONTEXT = RUN_CONTEXT.DEVELOPMENT;
            dotenv.config({ path: __dirname + "/../../.env-dev-2" });
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

    private static Boolean(value: unknown): boolean {
        return value === true ? true : value === "true";
    }
}

EnvVars.load();