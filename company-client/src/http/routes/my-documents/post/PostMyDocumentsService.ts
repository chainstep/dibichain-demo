import { IMyDocumentStore } from "../../../../storage/my-document/IMyDocumentStore";
import { MyDocument } from "../../../../types";
import { RouteService } from "../../routerFactory";


interface PostMyDocumentsServiceOptions {
    getMyDocumentStore: () => IMyDocumentStore;
}

interface Inputs {
    myDocuments: MyDocument[]
}


export class PostMyDocumentsService implements RouteService {
    private readonly getMyDocumentStore: () => IMyDocumentStore;


    constructor(options: PostMyDocumentsServiceOptions) {
        this.getMyDocumentStore = options.getMyDocumentStore;
    }


    public async run(inputs: Inputs): Promise<void> {
        const myDocuments = inputs.myDocuments;
        const myDocumentStore = this.getMyDocumentStore();

        for (let i = 0 ; i < myDocuments.length ; i++) {
            await myDocumentStore.upsert(myDocuments[i]);
        }
    }
}