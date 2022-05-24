import { NewProduct, NewProductEventParams } from "../src/types";
import { Product } from "../src/types";


export const TEST_PRODUCT: Product = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "assembly",
    number: "EAN 20359483920",
    documents: [
        "8181c8ae-eef1-4703-8498-2cf25be2877b",
        "8181c8ae-eef1-4703-8498-2cf25be2877c",
        "8181c8ae-eef1-4703-8498-2cf25be2877d"
    ],
    amount: 1,
    amountUnit: "each",
    weight: 65.53,
    weightUnit: "kg",
    carbonFootprint: 1345,
    carbonFootprintUnit: "kg"
};

export const TEST_NEW_PRODUCT_EVENT_PARAMS: NewProductEventParams = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    Type: "assembly",
    number: "EAN 20359483920",
    hash: "ab393730632e6b821d2c512e3336e9e45eaa23f742c21045317930b6830bee90"
};

export const TEST_NEW_PRODUCT: NewProduct = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "assembly",
    number: "EAN 20359483920",
    hash: "ab393730632e6b821d2c512e3336e9e45eaa23f742c21045317930b6830bee90",
    timestamp: 10
};