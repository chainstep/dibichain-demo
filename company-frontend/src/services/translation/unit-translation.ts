export const translateUnitToAbbreviation = (unit: string): string => {

    switch (unit) {
        case 'each': {
            return '';
        }
        case 'liter': {
            return 'l';
        }
        case 'centimeter': {
            return 'cm';
        }
        case 'square_centimeter': {
            return 'cm2';
        }
        case 'cubic_centimeter': {
            return 'cm3';
        }
        case 'meter': {
            return 'm';
        }
        case 'square_meter': {
            return 'm2';
        }
        case 'cubic_meter': {
            return 'm3';
        }
        case 'milligram': {
            return 'mg';
        }
        case 'gram': {
            return 'g';
        }
        case 'kilogram': {
            return 'kg';
        }
        case 'percentage': {
            return '%';
        }
        case 'parts_per_million': {
            return 'ppm';
        }
        default: {
            return '';
        }
    }
};