export interface ProductDetailsResponse {
    uid: string
    publicKey: string;
    message: {
        secret: string;
        cipherText: string;
        initVector: string;
    },
    timestamp: number;
}

export interface IProductDetailsResponseStore {
    upsert(response: ProductDetailsResponse): Promise<void>;
    find(params: {uid?: string, publicKey?: string}): Promise<ProductDetailsResponse[]>;
    delete(params: {uid: string}): Promise<void>;
}