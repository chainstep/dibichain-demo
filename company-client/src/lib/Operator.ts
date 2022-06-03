import axios, { AxiosResponse } from "axios";
import { Key, MyNewProduct, Product, ProductDetailsRequest, ProductDetailsResponse } from "../types";
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
        await axios.post(this.url + "/product-details-requests", productDetailsRequest);
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


    public async getProducts(keys: Key[]): Promise<Product[]> {
        if (!this.crypto) {
            return [];
        }

        const publicKeys = keys.map(key => key.publicKey);
        const productDetailsResponses = await this.getProductDetailsResponses(publicKeys);

        const products = this.extractProducts(keys, productDetailsResponses);
        return products;
    }

    private async getProductDetailsResponses(publicKeys: string[]): Promise<ProductDetailsResponse[]> {
        const response = await axios.get<AxiosResponse<{productDetailsResponses: ProductDetailsResponse[]}>>(
            this.url + "/product-details-responses",
            { params: { publicKeys: JSON.stringify(publicKeys) } }
        );
        return response.data.data.productDetailsResponses;
    }

    private extractProducts(keys: Key[], productDetailsResponses: ProductDetailsResponse[]): Product[] {
        const products = <Product[]> [];
        productDetailsResponses.forEach((productDetailsResponse) => {
            try {
                const key = keys.filter(_key => _key.publicKey === productDetailsResponse.publicKey)[0];
                const productString = this.crypto?.decrypt(key.privateKey, productDetailsResponse.message);

                const product = <Product> JSON.parse(productString || "");
                this.checkProduct(product);

                products.push(product);
                // eslint-disable-next-line no-empty
            } catch (error) {}
        });
        return products;
    }

    private checkProduct(product: Product): void {
        if (this.propertyExists(product, "amount") && this.propertyExists(product, "amountUnit") &&
            this.propertyExists(product, "carbonFootprint") && this.propertyExists(product, "carbonFootprintUnit") &&
            this.propertyExists(product, "documents") && this.propertyExists(product, "id") &&
            this.propertyExists(product, "name") && this.propertyExists(product, "number") &&
            this.propertyExists(product, "type") && this.propertyExists(product, "uid") &&
            this.propertyExists(product, "weight") && this.propertyExists(product, "weightUnit")) {
                return;
        }
        throw new Error("not a product");
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    private propertyExists(object: Object, key: string) {
        return key in object;
    }
}