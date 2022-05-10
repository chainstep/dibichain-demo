import { connect, model, Schema } from "mongoose";
import { REMOVE_MONGO_FIELDS } from "../constants";
import { IGreetingStore, Greeting } from "./IGreetingStore";


const schema = new Schema<Greeting>({
    text: { type: String, required: true },
    setter: { type: String, required: true }
});

const GreetingModel = model<Greeting>("Greeting", schema);


export class GreetingStoreMongoDB implements IGreetingStore {
    private readonly mongoUrl: string;


    constructor(options: { mongoUrl: string }) {
        this.mongoUrl = options.mongoUrl;
    }


    public async add(greeting: Greeting): Promise<void> {
        const { text, setter } = greeting;

        const filter = {
            setter
        };
        const update = {
            text,
            setter
        };

        await connect(this.mongoUrl);
        await GreetingModel.updateOne(filter, update, { upsert: true });
    }


    public async find(setter?: string): Promise<Greeting[]> {
        await connect(this.mongoUrl);
        const doc = await GreetingModel.find(setter ? { setter } : {}, REMOVE_MONGO_FIELDS).lean();
        return doc;
    }
}