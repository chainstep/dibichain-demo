export interface Product {
    id: string;
    uid: string;
    name: string;
    type: 'assembly' | 'purchase_part' | 'standard_part';
    number: string;
    documents?: string[];
    amount?: number;
    amountUnit?: 'each' | 'liter' | 'centimeter' | 'square_centimeter' | 'cubic_centimeter' | 'meter' | 'square_meter' | 'cubic_meter';
    weight?: number;
    weightUnit?: 'milligram' | 'gram' | 'kilogram' | 'percentage' | 'parts_per_million';
    carbonFootprint?: number;
    carbonFootprintUnit?: 'milligram' | 'gram' | 'kilogram';
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

export interface Document {
    uid: string;
    name: string;
    version: string;
    type: string;
    data: string;
    uploaded: number;
}

export type MyDocument = Document