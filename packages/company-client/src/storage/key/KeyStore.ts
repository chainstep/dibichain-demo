import { IKeyStore } from "./IKeyStore";


export class KeyStore {
    private static store: IKeyStore;


    public static init(store: IKeyStore): void {
        this.store = store;
    }


    public static get(): IKeyStore {
        if (!this.store) {
            throw new Error("Key store not initialized! Call init function first");
        }
        return this.store;
    }
}