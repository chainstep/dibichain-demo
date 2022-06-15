import { IMyDocumentStore } from "../../../../storage/my-document/IMyDocumentStore";
import { MyDocument } from "../../../../types";
import { RouteService } from "../../../routerFactory";


interface GetMyDocumentsServiceOptions {
    myDocumentStore: IMyDocumentStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    myDocuments: MyDocument[];
}


export class GetMyDocumentsService implements RouteService {
    private readonly myDocumentStore: IMyDocumentStore;


    constructor(options: GetMyDocumentsServiceOptions) {
        this.myDocumentStore = options.myDocumentStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const myDocuments = await this.myDocumentStore.find(inputs);
        return { myDocuments };
    }
}