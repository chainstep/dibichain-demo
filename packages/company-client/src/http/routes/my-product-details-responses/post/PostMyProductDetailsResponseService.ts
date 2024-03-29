import { NotFoundError } from "@atz3n/express-utils";
import { Operator } from "../../../../lib/Operator";
import { IMyDocumentStore } from "../../../../storage/my-document/IMyDocumentStore";
import { IMyProductStore } from "../../../../storage/my-product/IMyProductStore";
import { IProductDetailsRequestStore } from "../../../../storage/product-details-request/IProductDetailsRequestStore";
import { MyDocument, MyProduct } from "../../../../types";
import { RouteService } from "../../../routerFactory";


export interface Options {
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
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<void> {
        const { uid, publicKey, decline } = inputs;

        const productDetailsRequests = await this.options.productDetailsRequestStore.find({ uid, publicKey });
        if (productDetailsRequests.length === 0) {
            throw new NotFoundError("product details request not found");
        }

        const myProducts = await this.options.myProductStore.find({ uid });
        if (myProducts.length === 0) {
            throw new NotFoundError("product not found");
        }

        if (!decline) {
            const myProduct = myProducts[0];
            const myDocuments = await this.getMyProductDocuments(myProduct, this.options.myDocumentStore);
            await this.options.operator.sendProductDetails({
                myProduct,
                myDocuments,
                publicKey: productDetailsRequests[0].publicKey,
                algorithm: productDetailsRequests[0].algorithm
            });
        }

        productDetailsRequests[0].responded = true;
        await this.options.productDetailsRequestStore.upsert(productDetailsRequests[0]);
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