import { connect, Model } from "mongoose";


export abstract class AMongoDBStore {
    private readonly REMOVE_MONGO_FIELDS = "-_id -__v";
    protected model: Model<unknown>;
    protected url: string;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(options: {model: Model<any>, url: string}) {
        this.model = options.model;
        this.url = options.url;
    }


    protected async _upsert(filter: object, update: object): Promise<void> {
        await connect(this.url);
        await this.model.updateMany(filter, update, { upsert: true });
    }


    protected async _find<T>(filter: object): Promise<T[]> {
        await connect(this.url);
        return await this.model.find(filter, this.REMOVE_MONGO_FIELDS).lean();
    }


    protected async _delete(filter: object): Promise<void> {
        await connect(this.url);
        await this.model.deleteMany(filter);
    }
}