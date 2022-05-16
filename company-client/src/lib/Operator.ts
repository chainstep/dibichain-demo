import { Product } from "../types";
import crypto from "crypto";
import axios from "axios";


export interface OperatorOptions {
    url: string;
}


export class Operator {
    private readonly url: string;

    constructor(options: OperatorOptions) {
        this.url = options.url;
    }

    public async announceProduct(product: Product) {
        const hash = this.createHash(product);
        await axios.post(this.url + "/products", {
            id: product.id,
            uid: product.uid,
            name: product.name,
            type: product.type,
            number: product.number,
            hash
        });
    }

    private createHash(product: Product): string {
        return crypto
            .createHash("sha256")
            .update(this.createNormalizedProduct(product))
            .digest("hex");
    }

    private createNormalizedProduct(product: Product) {
        const productValues: (string | number)[] = [
            product.uid,
            product.id,
            product.name,
            product.number,
            product.type
        ];
        if (product.amount) {
            productValues.push(product.amount);
        }
        if (product.amountUnit) {
            productValues.push(product.amountUnit);
        }
        if (product.weight) {
            productValues.push(product.weight);
        }
        if (product.weightUnit) {
            productValues.push(product.weightUnit);
        }
        if (product.carbonFootprint) {
            productValues.push(product.carbonFootprint);
        }
        if (product.carbonFootprintUnit) {
            productValues.push(product.carbonFootprintUnit);
        }
        if (product.documents) {
            product.documents.forEach(document => productValues.push(document));
        }
        return productValues.join("");
    }
}