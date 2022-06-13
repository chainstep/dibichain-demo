import { Operator } from "../../lib/Operator";
import { IDocumentStore } from "../../storage/document/IDocumentStore";
import { IKeyStore } from "../../storage/key/IKeyStore";
import { IMyProductDetailsRequestStore } from "../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { INewProductStore } from "../../storage/new-product/INewProductStore";
import { IProductStore } from "../../storage/product/IProductStore";
import { Key, MyProductDetailsRequest, ProductPackage } from "../../types";
import { IntervalService } from "../IntervalHandler";


export interface PollProductsServiceOptions {
    getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    getKeyStore: () => IKeyStore;
    getProductStore: () => IProductStore;
    getDocumentStore: () => IDocumentStore;
    getNewProductStore: () => INewProductStore;
    operator: Operator;
}


export class PollProductsService implements IntervalService {
    private readonly getMyProductDetailsRequestStore: () => IMyProductDetailsRequestStore;
    private readonly getKeyStore: () => IKeyStore;
    private readonly getProductStore: () => IProductStore;
    private readonly getDocumentStore: () => IDocumentStore;
    private readonly getNewProductStore: () => INewProductStore;
    private readonly operator: Operator;


    constructor(options: PollProductsServiceOptions) {
        this.getMyProductDetailsRequestStore = options.getMyProductDetailsRequestStore;
        this.getKeyStore = options.getKeyStore;
        this.getProductStore = options.getProductStore;
        this.getDocumentStore = options.getDocumentStore;
        this.getNewProductStore = options.getNewProductStore;
        this.operator = options.operator;
    }


    public async run(): Promise<void> {
        const myProductDetailsRequestStore = this.getMyProductDetailsRequestStore();
        const keyStore = this.getKeyStore();
        const productStore = this.getProductStore();
        const documentStore = this.getDocumentStore();
        const newProductStore = this.getNewProductStore();

        const myProductDetailsRequests = await myProductDetailsRequestStore.find({});
        const notRespondedRequests = myProductDetailsRequests.filter((myProductDetailsRequest) => {
            return !myProductDetailsRequest.responded;
        });

        const keysAndHashes = await this.getKeysAndHashes(
            notRespondedRequests,
            keyStore,
            newProductStore
        );

        const productPackages = await this.operator.getProductDetails(keysAndHashes);
        for (let i = 0 ; i < productPackages.length ; i++) {
            const productPackage = productPackages[i];

            await this.updateProductAndDocumentStores(
                productPackage,
                productStore,
                documentStore
            );

            await this.updateMyProductDetailsRequestStore(
                notRespondedRequests,
                productPackage.product.uid,
                myProductDetailsRequestStore
            );
        }
    }

    private async getKeysAndHashes(
        requests: MyProductDetailsRequest[],
        keyStore: IKeyStore,
        newProductStore: INewProductStore
    ): Promise<{key: Key, hash: string}[]> {
        const keysAndHashes = <{key: Key, hash: string}[]> [];
        for (let i = 0 ; i < requests.length ; i++) {
            const publicKey = requests[i].publicKey;
            const uid = requests[i].uid;

            const key = (await keyStore.find({ publicKey }))[0];
            const hash = (await newProductStore.find({ uid }))[0].hash;

            keysAndHashes.push({ key, hash });
        }
        return keysAndHashes;
    }

    private async updateProductAndDocumentStores(
        productPackage: ProductPackage,
        productStore: IProductStore,
        documentStore: IDocumentStore
    ): Promise<void> {
        const { product, documents } = productPackage;
        await productStore.upsert(product);
        for (let i = 0 ; i < documents.length ; i++) {
            await documentStore.upsert(documents[i]);
        }
    }

    private async updateMyProductDetailsRequestStore(
        requests: MyProductDetailsRequest[],
        uid: string,
        myProductDetailsRequestStore: IMyProductDetailsRequestStore
    ): Promise<void> {
        const respondedRequest = requests.find(request => request.uid === uid);
        if (respondedRequest) {
            respondedRequest.responded = true;
            await myProductDetailsRequestStore.upsert(respondedRequest);
        }
    }
}