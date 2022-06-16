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