import { NotFoundError } from "@atz3n/express-utils";
import { Operator } from "../../../../lib/Operator";
import { IMyDocumentStore } from "../../../../storage/my-document/IMyDocumentStore";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { IProductDetailsRequestStore } from "../../../../storage/product-details-request/IProductDetailsRequestStore";
import { MyDocument, MyProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface PostMyProductDetailsResponseServiceOptions {
    productDetailsRequestStore: IProductDetailsRequestStore;
    myProductStore: IMyProductStore;
    myDocumentStore: IMyDocumentStore;
    operator: Operator;
}

interface Inputs {
    uid: string;
    publicKey: string;
    decline?: boolean;
}


export class PostMyProductDetailsResponseService implements RouteService {
    private readonly productDetailsRequestStore: IProductDetailsRequestStore;
    private readonly myProductStore: IMyProductStore;
    private readonly myDocumentStore: IMyDocumentStore;
    private readonly operator: Operator;


    constructor(options: PostMyProductDetailsResponseServiceOptions) {
        this.productDetailsRequestStore = options.productDetailsRequestStore;
        this.myProductStore = options.myProductStore;
        this.myDocumentStore = options.myDocumentStore;
        this.operator = options.operator;
    }


    public async run(inputs: Inputs): Promise<void> {
        const { uid, publicKey, decline } = inputs;

        const productDetailsRequests = await this.productDetailsRequestStore.find({ uid, publicKey });
        if (productDetailsRequests.length === 0) {
            throw new NotFoundError("product details request not found");
        }

        const myProducts = await this.myProductStore.find({ uid });
        if (myProducts.length === 0) {
            throw new NotFoundError("product not found");
        }

        if (!decline) {
            const myProduct = myProducts[0];
            const myDocuments = await this.getMyProductDocuments(myProduct, this.myDocumentStore);
            await this.operator.sendProductDetails({
                myProduct,
                myDocuments,
                publicKey: productDetailsRequests[0].publicKey,
                algorithm: productDetailsRequests[0].algorithm
            });
        }

        productDetailsRequests[0].responded = true;
        await this.productDetailsRequestStore.upsert(productDetailsRequests[0]);
    }

    private async getMyProductDocuments(myProduct: MyProduct, myDocumentStore: IMyDocumentStore) {
        let myDocuments = <MyDocument[]> [];
        if (myProduct.documents) {
            for (let i = 0 ; i < myProduct.documents.length ; i++) {
                const _myDocuments = await myDocumentStore.find({ uid: myProduct.documents[i] });
                myDocuments = [...myDocuments, ..._myDocuments];
            }
        }
        return myDocuments;
    }
}