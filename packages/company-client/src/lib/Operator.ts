import axios, { AxiosResponse } from "axios";
import { logger } from "../utils/logger";
import { EncMessage, Key, MyDocument, MyNewProduct, MyProduct, Product, ProductDetailsRequest, ProductDetailsResponse, ProductPackage, Document } from "../types";
import { Crypto } from "./Crypto";
import { isAmountUnit, isCarbonFootprintUnit, isProductType, isWeightUnit } from "../utils/propertyCheckers";


export interface OperatorOptions {
    crypto: Crypto
    url: string;
}


export class Operator {
    private readonly url: string;
    private readonly crypto: Crypto;


    constructor(options: OperatorOptions) {
        this.url = options.url;
        this.crypto = options.crypto;
    }


    public async announceNewProduct(product: Product): Promise<MyNewProduct> {
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


    public async sendProductDetails(
        params: {
            publicKey: string,
            algorithm: string,
            myProduct: MyProduct,
            myDocuments: MyDocument[]
        }
    ): Promise<void> {
        const { publicKey, myProduct, myDocuments } = params;
        const stringifiedProductPackage = JSON.stringify({ product: myProduct, documents: myDocuments });
        const message = this.crypto.encrypt(publicKey, stringifiedProductPackage);

        await axios.post(this.url + "/product-details-responses", {
            publicKey,
            message,
            uid: myProduct.uid
        });
    }


    public async getProductDetails(params: { key: Key, hash: string }[]): Promise<ProductPackage[]> {
        const publicKeys = params.map(param => param.key.publicKey);
        const productDetailsResponses = await this.getProductDetailsResponses(publicKeys);

        const products = this.extractProductPackages(params, productDetailsResponses);
        return products;
    }

    private async getProductDetailsResponses(publicKeys: string[]): Promise<ProductDetailsResponse[]> {
        const response = await axios.get<AxiosResponse<{productDetailsResponses: ProductDetailsResponse[]}>>(
            this.url + "/product-details-responses",
            { params: { publicKeys: JSON.stringify(publicKeys) } }
        );
        return response.data.data.productDetailsResponses;
    }

    private extractProductPackages(
        params: { key: Key, hash: string }[],
        productDetailsResponses: ProductDetailsResponse[]
    ): ProductPackage[] {
        const productPackages = <ProductPackage[]> [];
        productDetailsResponses.forEach((productDetailsResponse) => {
            try {
                const param = params.filter(_param => _param.key.publicKey === productDetailsResponse.publicKey)[0];
                const productPackage = this.decryptProductPackage(param.key.privateKey, productDetailsResponse.message);

                this.checkProductPackage(productPackage);
                this.verifyHash(productPackage.product, param.hash);

                productPackages.push(productPackage);
            } catch (error) {
                logger.debug("Operator:extractProductPackages -> " + (<Error> error).message);
            }
        });
        return productPackages;
    }

    private decryptProductPackage(privateKey: string, message: EncMessage): ProductPackage {
        const productPackageString = this.crypto.decrypt(privateKey, message);
        return <ProductPackage> JSON.parse(productPackageString || "");
    }

    private checkProductPackage(productPackage: ProductPackage): void {
        const { documents, product } = productPackage;

        this.checkProduct(product);
        if (documents.length !== 0) {
            this.checkDocuments(documents, product.documents || []);
        }
    }

    private checkProduct(product: Product): void {
        if (product
         && typeof product.amount === "number"
         && typeof product.amountUnit === "string" && isAmountUnit(product.amountUnit)
         && typeof product.carbonFootprint === "number"
         && typeof product.carbonFootprintUnit === "string" && isCarbonFootprintUnit(product.carbonFootprintUnit)
         && Array.isArray(product.documents)
         && typeof product.id === "string"
         && typeof product.name === "string"
         && typeof product.number === "string"
         && typeof product.type === "string" && isProductType(product.type)
         && typeof product.uid === "string"
         && typeof product.weight === "number"
         && typeof product.weightUnit === "string" && isWeightUnit(product.weightUnit)) {
            return;
        }
        throw new Error("not a product");
    }

    private checkDocuments(documents: Document[], documentIds: string[]): void {
        documents.forEach((document) => {
            if (!documentIds.includes(document.uid)) {
                throw new Error("document uid not found");
            }

            if (document
             && typeof document.data === "string"
             && typeof document.name === "string"
             && typeof document.type === "string"
             && typeof document.uid === "string"
             && typeof document.timestamp === "number"
             && typeof document.version === "string") {
                return;
            }
            throw new Error("not a document");
        });
    }

    private verifyHash(product: Product, hash: string): void {
        const calcHash = this.crypto.hash(this.createNormalizedProduct(product));
        if (calcHash !== hash) {
            throw new Error("product hash does not match");
        }
    }
}