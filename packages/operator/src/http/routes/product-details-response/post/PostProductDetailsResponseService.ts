import { IProductDetailsResponseStore } from "../../../../storage/product-details-response/IProductDetailsResponseStore";
import { EncMessage } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface PostProductDetailsResponseServiceOptions {
    productDetailsResponseStore: IProductDetailsResponseStore;
}

interface Inputs {
    uid: string;
    publicKey: string;
    message: EncMessage;
}


export class PostProductDetailsResponseService implements RouteService {
    private readonly productDetailsResponseStore:  IProductDetailsResponseStore;


    constructor(options: PostProductDetailsResponseServiceOptions) {
        this.productDetailsResponseStore = options.productDetailsResponseStore;
    }


    public async run(inputs: Inputs): Promise<void> {
        const { uid, message, publicKey } = inputs;
        const timestamp = Math.floor(new Date().getTime() / 1000);
        await this.productDetailsResponseStore.upsert({
            message,
            publicKey,
            timestamp,
            uid
        });
    }
}