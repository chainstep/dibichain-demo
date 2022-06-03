export interface Product {
    id: string;
    uid: string;
    name: string;
    type: "assembly" | "purchase_part" | "standard_part";
    number: string;
    documents?: string[];
    amount?: number;
    amountUnit?: "each" | "liter" | "centimeter" | "square_centimeter" | "cubic_centimeter" | "meter" | "square_meter" | "cubic_meter";
    weight?: number;
    weightUnit?: "mg" | "g" | "kg" | "%" | "ppm";
    carbonFootprint?: number;
    carbonFootprintUnit?: "mg" | "g" | "kg";
}

export type MyProduct = Product

export interface ResponseProduct extends Omit<Product, "amount" | "weight" | "carbonFootprint" > {
    amount?: string;
    weight?: string;
    carbonFootprint?: string;
}

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