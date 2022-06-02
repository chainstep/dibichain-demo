export type NewProduct = {
    id: string;
    uid: string;
    name: string;
    type: "assembly" | "purchase_part" | "standard_part";
    number: string;
    hash: string;
}