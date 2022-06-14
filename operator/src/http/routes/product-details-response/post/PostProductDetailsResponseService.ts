import { IProductDetailsResponseStore } from "../../../../storage/product-details-response/IProductDetailsResponseStore";
import { EncMessage } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface PostProductDetailsResponseServiceOptions {
    getProductDetailsResponseStore: () => IProductDetailsResponseStore;
}

interface Inputs {
    uid: string;
    publicKey: string;
    message: EncMessage;
}


export class PostProductDetailsResponseService implements RouteService {
    private readonly getProductDetailsResponseStore: () => IProductDetailsResponseStore;


    constructor(options: PostProductDetailsResponseServiceOptions) {
        this.getProductDetailsResponseStore = options.getProductDetailsResponseStore;
    }


    public async run(inputs: Inputs): Promise<void> {
        const { uid, message, publicKey } = inputs;
        const productDetailsResponseStore = this.getProductDetailsResponseStore();

        const timestamp = Math.floor(new Date().getTime() / 1000);
        await productDetailsResponseStore.upsert({
            message,
            publicKey,
            timestamp,
            uid
        });
    }
}