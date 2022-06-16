
export function isProductType(value: string): boolean {
    return value === "assembly"
        || value === "purchase_part"
        || value === "standard_part";
}


export function isDocumentIdArray(value: string): boolean {
    if (!Array.isArray(value)) {
        return false;
    }

    for (let i = 0 ; i < value.length ; i++) {
        const documentId = <string> value[i];
        if (typeof documentId === "string" && !isUUID(documentId)) {
            return false;
        }
    }

    return true;
}


export function isUUID(id: string): boolean {
    const test = "" + id;
    return !!test.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
}


export function isAmountUnit(value: string): boolean {
    return value === "each"
        || value === "liter" || value === "l"
        || value === "centimeter" || value === "cm"
        || value === "square_centimeter" || value === "cm2"
        || value === "cubic_centimeter" || value === "cm3"
        || value === "meter" || value === "m"
        || value === "square_meter" || value === "m2"
        || value === "cubic_meter" || value === "m3";
}


export function isWeightUnit(value: string): boolean {
    return value === "milligram" || value === "mg"
        || value === "gram" || value === "g"
        || value === "kilogram" || value === "kg"
        || value === "percentage" || value === "%"
        || value === "parts_per_million" || value === "ppm";
}


export function isCarbonFootprintUnit(value: string): boolean {
    return value === "milligram" || value === "mg"
        || value === "gram" || value === "g"
        || value === "kilogram" || value === "kg";
}
