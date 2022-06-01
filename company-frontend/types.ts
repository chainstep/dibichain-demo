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
    weightUnit?: 'mg' | 'g' | 'kg' | '%' | 'ppm';
    carbonFootprint?: number;
    carbonFootprintUnit?: 'mg' | 'g' | 'kg';
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