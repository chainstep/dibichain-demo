
export function isProductType(value: string): boolean {
    return value.includes("assembly")
        || value.includes("purchase_part")
        || value.includes("standard_part");
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
    return value.includes("each")
        || value.includes("liter")
        || value.includes("centimeter")
        || value.includes("square_centimeter")
        || value.includes("cubic_centimeter")
        || value.includes("meter")
        || value.includes("square_meter")
        || value.includes("cubic_meter");
}


export function isWeightUnit(value: string): boolean {
    return value.includes("mg")
        || value.includes("g")
        || value.includes("kg")
        || value.includes("%")
        || value.includes("ppm");
}


export function isCarbonFootprintUnit(value: string): boolean {
    return value.includes("mg")
        || value.includes("g")
        || value.includes("kg");
}
