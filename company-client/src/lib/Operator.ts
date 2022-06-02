import axios from "axios";
import { MyNewProduct, Product, ProductDetailsRequest } from "../types";
import { Crypto } from "./Crypto";

export interface OperatorOptions {
    crypto?: Crypto
    url: string;
}


export class Operator {
    private readonly url: string;
    private readonly crypto?: Crypto;


    constructor(options: OperatorOptions) {
        this.url = options.url;
        this.crypto = options.crypto;
    }


    public async announceNewProduct(product: Product): Promise<MyNewProduct> {
        if (!this.crypto) {
            return <MyNewProduct> {};
        }
        const hash = this.crypto.hash(this.createNormalizedProduct(product));
        const myNewProduct = {
            id: product.id,
            uid: product.uid,
            name: product.name,
            type: product.type,
            number: product.number,
            hash
        };
        await axios.post(this.url + "/new-products", myNewProduct);
        return { ...myNewProduct, timestamp: 0 };
    }

    private createNormalizedProduct(product: Product): string {
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


    public async announceProductDetailsRequest(productDetailsRequest: Omit<ProductDetailsRequest, "timestamp" | "responded">): Promise<void> {
        await axios.post(this.url + "/product-details-request", productDetailsRequest);
    }


    public async sendProductDetailsResponse(
        params: {
            publicKey: string,
            algorithm: string,
            product: Product
        }
    ): Promise<void> {
        if (!this.crypto) {
            return;
        }
        const { publicKey, product } = params;
        const normalizedProduct = this.createNormalizedProduct(product);
        const message = this.crypto.encrypt(publicKey, normalizedProduct);
        await axios.post(this.url + "/product-details-responses", {
            publicKey,
            message,
            uid: product.uid
        });
    }
}