import { IMyDocumentStore } from "../../../../storage/my-document/IMyDocumentStore";
import { MyDocument } from "../../../../types";
import { RouteService } from "../../../routerFactory";


interface PostMyDocumentsServiceOptions {
    myDocumentStore: IMyDocumentStore;
}

interface Inputs {
    myDocuments: MyDocument[]
}


export class PostMyDocumentsService implements RouteService {
    private readonly myDocumentStore: IMyDocumentStore;


    constructor(options: PostMyDocumentsServiceOptions) {
        this.myDocumentStore = options.myDocumentStore;
    }


    public async run(inputs: Inputs): Promise<void> {
        const myDocuments = inputs.myDocuments;

        for (let i = 0 ; i < myDocuments.length ; i++) {
            await this.myDocumentStore.upsert(myDocuments[i]);
        }
    }
}