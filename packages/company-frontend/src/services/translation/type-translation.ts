export const translateType = (type: string): string => {
    switch (type) {
        case 'assembly': {
            return 'Assembly';
        }
        case 'purchase_part': {
            return 'Purchase Part';
        }
        case 'standard_part': {
            return 'Standard Part';
        }
        default: {
            return '';
        }
    }
};