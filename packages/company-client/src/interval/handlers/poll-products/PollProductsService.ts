import { Operator } from "../../../lib/Operator";
import { IDocumentStore } from "../../../storage/document/IDocumentStore";
import { IKeyStore } from "../../../storage/key/IKeyStore";
import { IMyProductDetailsRequestStore } from "../../../storage/my-product-details-request/IMyProductDetailsRequestStore";
import { INewProductStore } from "../../../storage/new-product/INewProductStore";
import { IProductStore } from "../../../storage/product/IProductStore";
import { Key, MyProductDetailsRequest, ProductPackage } from "../../../types";
import { IntervalService } from "../../IntervalHandler";


interface Options {
    myProductDetailsRequestStore: IMyProductDetailsRequestStore;
    keyStore: IKeyStore;
    productStore: IProductStore;
    documentStore: IDocumentStore;
    newProductStore: INewProductStore;
    operator: Operator;
}


export class PollProductsService implements IntervalService {
    constructor(private readonly options: Options) {}


    public async run(): Promise<void> {
        const myProductDetailsRequests = await this.options.myProductDetailsRequestStore.find({});
        const notRespondedRequests = myProductDetailsRequests.filter((myProductDetailsRequest) => {
            return !myProductDetailsRequest.responded;
        });

        const keysAndHashes = await this.getKeysAndHashes(
            notRespondedRequests,
            this.options.keyStore,
            this.options.newProductStore
        );

        const productPackages = await this.options.operator.getProductDetails(keysAndHashes);
        for (let i = 0 ; i < productPackages.length ; i++) {
            const productPackage = productPackages[i];

            await this.updateProductAndDocumentStores(
                productPackage,
                this.options.productStore,
                this.options.documentStore
            );

            await this.updateMyProductDetailsRequestStore(
                notRespondedRequests,
                productPackage.product.uid,
                this.options.myProductDetailsRequestStore
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