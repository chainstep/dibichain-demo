export interface Product {
    id: string;
    uid: string;
    name: string;
    type: string;
    number: string;
    documents?: string[];
    amount?: number;
    amountUnit?: string;
    weight?: number;
    weightUnit?: string;
    carbonFootprint?: number;
    carbonFootprintUnit?: string;
}

export type MyProduct = Product


export interface ProductEvent {
    uid: string;
    timestamp: number;
}

export interface NewProduct extends ProductEvent {
    id: string;
    name: string;
    type: string;
    number: string;
    hash: string;
}

export type MyNewProduct = NewProduct


export interface NewProductEventParams {
    id: string;
    uid: string;
    name: string;
    Type: string;
    number: string;
    hash: string;
}


export interface ProductDetailsRequestEventParams {
    uid: string;
    publicKey: string;
    algorithm: string;
}


export interface ProductDetailsRequest extends ProductEvent {
    publicKey: string;
    algorithm: string;
    responded: boolean;
}

export type MyProductDetailsRequest = ProductDetailsRequest


export interface Key {
    privateKey: string;
    publicKey: string;
    algorithm: string;
}


export interface EncMessage {
    secret: string;
    cipherText: string;
    initVector: string;
}


export interface ProductDetailsResponse {
    publicKey: string,
    uid: string;
    message: EncMessage
}


export interface Document {
    uid: string;
    name: string;
    version: string;
    type: string;
    data: string;
    timestamp: number;
}

export type MyDocument = Document


export interface ProductPackage {
    product: Product,
    documents: Document[]
}


export type BlockchainInfo = {
    blockHeight: number;
    id?: string;
}
