import { NewProductEvent } from "../../types";

export interface INewProductEventStore {
    add(event: NewProductEvent): Promise<void>;
    find(params: {uid?: string}): Promise<NewProductEvent[]>;
    delete(params: {uid: string}): Promise<void>;
}