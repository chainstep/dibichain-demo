export interface NewProduct {
    id: string;
    uid: string;
    name: string;
    type: string;
    number: string;
    hash: string;
}


export interface EncMessage {
    secret: string;
    cipherText: string;
    initVector: string;
}


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