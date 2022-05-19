import { StaticJsonRpcProvider, WebSocketProvider, Provider } from "@ethersproject/providers";
import { logger } from "../utils/logger";


export interface RPCProviderWSConfig {
    connectionCheckIntervalSec: number;
    connectionCheckTimeoutSec: number;
    keepAliveIntervalSec: number;
    reconnectDelaySec: number;
}


export class RPCProvider {
    private static connectionCheckIntervalSec = 15;
    private static connectionCheckTimeoutSec = 20;
    private static keepAliveIntervalSec = 5 * 60;
    private static reconnectDelaySec = 2;

    public static provider: WebSocketProvider | StaticJsonRpcProvider;

    private static url: string;
    private static isReconnect = false;
    private static keepAliveInterval: ReturnType<typeof setInterval>;
    private static connectionCheckInterval: ReturnType<typeof setInterval>;
    private static connectionCheckTimeout: ReturnType<typeof setInterval>;
    private static reconnectCb?: (provider: Provider) => Promise<void>;
    private static isTryingToReconnect = false;


    public static setWSConfig(config: RPCProviderWSConfig) {
        this.connectionCheckIntervalSec = config.connectionCheckIntervalSec;
        this.connectionCheckTimeoutSec = config.connectionCheckTimeoutSec;
        this.keepAliveIntervalSec = config.keepAliveIntervalSec;
        this.reconnectDelaySec = config.reconnectDelaySec;
    }


    public static async init(url: string, reconnectCb?: (provider: Provider) => Promise<void>): Promise<void> {
        if (!this.isReconnect) {
            this.url = url;
            this.reconnectCb = reconnectCb;
        }

        if (this.isWebSocket()) {
            this.provider = new WebSocketProvider(this.url);

            (<WebSocketProvider> this.provider)._websocket.on("open", async () => {
                logger.info("WS provider connected");
                if (this.isReconnect && this.reconnectCb) {
                    await this.reconnectCb(this.provider);
                }
                this.isReconnect = true;
                this.setKeepAliveInterval();
                this.setConnectionCheckInterval();
            });

            (<WebSocketProvider> this.provider)._websocket.on("close", async () => {
                logger.info("WS provider connection closed. Trying to reconnect...");
                await this.reconnect();
            });

            (<WebSocketProvider> this.provider)._websocket.on("error", async (error: unknown) => {
                logger.error("WS provider connection lost: " + error);
                logger.info("Trying to reconnect...");
                await this.reconnect();
            });

            (<WebSocketProvider> this.provider)._websocket.on("pong", () => {
                logger.debug("WS provider connection is alive");
                clearTimeout(this.connectionCheckTimeout);
            });
        } else {
            this.provider = new StaticJsonRpcProvider(url);
        }
    }

    private static isWebSocket(): boolean {
        return this.url.startsWith("wss://") || this.url.startsWith("ws://");
    }

    private static setKeepAliveInterval(): void {
        this.keepAliveInterval = setInterval(() => {
            logger.debug("Sending ws provider keep alive message");
            this.provider.getBlockNumber();
        }, this.keepAliveIntervalSec * 1000);
    }

    private static async reconnect(): Promise<void> {
        if (!this.isTryingToReconnect) {
            this.isTryingToReconnect = true;
            (<WebSocketProvider> this.provider)._websocket.terminate();
            clearInterval(this.keepAliveInterval);
            clearInterval(this.connectionCheckInterval);
            clearTimeout(this.connectionCheckTimeout);
            await this.sleep(this.reconnectDelaySec * 1000);

            this.init(this.url);
            this.isTryingToReconnect = false;
        }
    }

    private static setConnectionCheckInterval(): void {
        this.connectionCheckInterval = setInterval(() => {
            logger.debug("Checking ws provider connection");
            (<WebSocketProvider> this.provider)._websocket.ping();

            this.connectionCheckTimeout = setTimeout(() => {
                (<WebSocketProvider> this.provider)._websocket.terminate();
            }, this.connectionCheckTimeoutSec * 1000);
        }, this.connectionCheckIntervalSec * 1000);
    }

    private static async sleep(timeInMs: number): Promise<void> {
        await new Promise(r => setTimeout(r, timeInMs));
    }
}