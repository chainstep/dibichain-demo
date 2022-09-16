import { IProductDetailsResponseStore } from "../../../../storage/product-details-response/IProductDetailsResponseStore";
import { EncMessage } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
    productDetailsResponseStore: IProductDetailsResponseStore;
}

interface Inputs {
    uid: string;
    publicKey: string;
    message: EncMessage;
}


export class PostProductDetailsResponseService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<void> {
        const { uid, message, publicKey } = inputs;
        const timestamp = Math.floor(new Date().getTime() / 1000);
        await this.options.productDetailsResponseStore.upsert({
            message,
            publicKey,
            timestamp,
            uid
        });
    }
}