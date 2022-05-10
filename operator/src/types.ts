export type Product = {
    id: string,
    uid: string,
    name: string,
    type: "assembly" | "purchasePart" | "standardPart",
    number: string,
    documents?: string[],
    amount?: number,
    amountUnit?: "each" | "liter" | "centimeter" | "square_centimeter" | "cubic_centimeter" | "meter" | "square_meter" | "cubic_meter",
    weight?: number,
    weightUnit?: "mg" | "g" | "kg" | "%" | "ppm",
    carbonFootprint?: number,
    carbonFootprintUnit?: "mg" | "g" | "kg"
}