import { NewProductEventParams } from "../src/types";
import { Product } from "../src/types";


export const product: Product = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    type: "assembly",
    number: "EAN 20359483920",
    documents: [ "8181c8ae-eef1-4703-8498-2cf25be2877b"],
    amount: 1,
    amountUnit: "each",
    weight: 65.53,
    weightUnit: "kg",
    carbonFootprint: 1345,
    carbonFootprintUnit: "kg"
};

export const newProductEventParams: NewProductEventParams = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    Type: "assembly",
    number: "EAN 20359483920",
    hash: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
};
