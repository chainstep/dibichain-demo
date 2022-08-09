import { connect, connection, Model, ConnectionStates } from "mongoose";


export abstract class AMongoDBStore {
    private readonly CONNECTION_TIMEOUT_SEC = 60;
    private readonly REMOVE_MONGO_FIELDS = "-_id -__v";
    protected model: Model<unknown>;
    protected url: string;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(options: {model: Model<any>, url: string}) {
        this.model = options.model;
        this.url = options.url;
        this.connectToDB();
    }

    private connectToDB(): void {
        if (connection.readyState === ConnectionStates.disconnected
         || connection.readyState === ConnectionStates.disconnecting) {
            connect(this.url);
        }
    }


    protected async _upsert(filter: object, update: object): Promise<void> {
        await this.waitUntilConnected();
        await this.model.updateMany(filter, update, { upsert: true });
    }

    private async waitUntilConnected(counter = 0): Promise<void> {
        if (connection.readyState === ConnectionStates.connected) {
            return;
        }

        if (connection.readyState === ConnectionStates.disconnected
         || connection.readyState === ConnectionStates.disconnecting) {
            await connect(this.url);
        }

        if (connection.readyState === ConnectionStates.connecting) {
            if (counter >= this.CONNECTION_TIMEOUT_SEC) {
                throw new Error("Connection timeout");
            }
            counter++;
            await this.sleep(1000);
            await this.waitUntilConnected(counter);
        }
    }

    private async sleep(timeInMs: number): Promise<void> {
        await new Promise(r => setTimeout(r, timeInMs));
    }


    protected async _find<T>(filter: object): Promise<T[]> {
        await this.waitUntilConnected();
        return await this.model.find(filter, this.REMOVE_MONGO_FIELDS).lean();
    }


    protected async _delete(filter: object): Promise<void> {
        await this.waitUntilConnected();
        await this.model.deleteMany(filter);
    }
}