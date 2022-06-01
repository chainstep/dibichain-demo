import { IProductDetailsResponseStore } from "./IProductDetailsResponseStore";


export class ProductDetailsResponseStore {
    private static store: IProductDetailsResponseStore;


    public static init(store: IProductDetailsResponseStore): void {
        this.store = store;
    }


    public static get(): IProductDetailsResponseStore {
        if (!this.store) {
            throw new Error("ProductDetailsResponse store not initialized! Call init function first");
        }
        return this.store;
    }
}