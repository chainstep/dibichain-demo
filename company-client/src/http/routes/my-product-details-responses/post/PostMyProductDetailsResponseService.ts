import { NotFoundError } from "@atz3n/express-utils";
import { Operator } from "../../../../lib/Operator";
import { IMyDocumentStore } from "../../../../storage/my-document/IMyDocumentStore";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { IProductDetailsRequestStore } from "../../../../storage/product-details-request/IProductDetailsRequestStore";
import { MyDocument } from "../../../../types";
import { RouteService } from "../../routerFactory";


export interface PostMyProductDetailsResponseServiceOptions {
    getProductDetailsRequestStore: () => IProductDetailsRequestStore;
    getMyProductStore: () => IMyProductStore;
    getMyDocumentStore: () => IMyDocumentStore;
    operator: Operator;
}

interface Inputs {
    uid: string;
    publicKey: string;
    decline?: boolean;
}


export class PostMyProductDetailsResponseService implements RouteService {
    private readonly getProductDetailsRequestStore: () => IProductDetailsRequestStore;
    private readonly getMyProductStore: () => IMyProductStore;
    private readonly getMyDocumentStore: () => IMyDocumentStore;
    private readonly operator: Operator;


    constructor(options: PostMyProductDetailsResponseServiceOptions) {
        this.getProductDetailsRequestStore = options.getProductDetailsRequestStore;
        this.getMyProductStore = options.getMyProductStore;
        this.getMyDocumentStore = options.getMyDocumentStore;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const { uid, publicKey, decline } = inputs;
        const productDetailsRequestStore = this.getProductDetailsRequestStore();
        const myProductStore = this.getMyProductStore();
        const myDocumentStore = this.getMyDocumentStore();

        const productDetailsRequests = await productDetailsRequestStore.find({ uid, publicKey });
        if (productDetailsRequests.length === 0) {
            throw new NotFoundError("product details request not found");
        }

        const myProducts = await myProductStore.find({ uid });
        if (myProducts.length === 0) {
            throw new NotFoundError("product not found");
        }

        if (!decline) {
            const myProduct = myProducts[0];
            let myDocuments = <MyDocument[]> [];
            if (myProduct.documents) {
                for (let i = 0 ; i < myProduct.documents.length ; i++) {
                    const _myDocuments = await myDocumentStore.find({ uid: myProduct.documents[i] });
                    myDocuments = [...myDocuments, ..._myDocuments];
                }
            }

            await this.operator.sendProductDetails({
                myProduct,
                myDocuments,
                publicKey: productDetailsRequests[0].publicKey,
                algorithm: productDetailsRequests[0].algorithm
            });
        }

        productDetailsRequests[0].responded = true;
        await productDetailsRequestStore.upsert(productDetailsRequests[0]);
    }
}