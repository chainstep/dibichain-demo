import { IMyDocumentStore } from "../../../../storage/my-document/IMyDocumentStore";
import { MyDocument } from "../../../../types";
import { RouteService } from "../../routerFactory";


interface GetMyDocumentsServiceOptions {
    getMyDocumentStore: () => IMyDocumentStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    myDocuments: MyDocument[];
}


export class GetMyDocumentsService implements RouteService {
    private readonly getMyDocumentStore: () => IMyDocumentStore;


    constructor(options: GetMyDocumentsServiceOptions) {
        this.getMyDocumentStore = options.getMyDocumentStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const myDocumentStore = this.getMyDocumentStore();

        const myDocuments = await myDocumentStore.find(inputs);
        return { myDocuments };
    }
}