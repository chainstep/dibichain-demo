import { IDocumentStore } from "../../../../storage/document/IDocumentStore";
import { Document } from "../../../../types";
import { RouteService } from "../../../routerFactory";


interface GetDocumentsServiceOptions {
    getDocumentStore: () => IDocumentStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    documents: Document[];
}


export class GetDocumentsService implements RouteService {
    private readonly getDocumentStore: () => IDocumentStore;


    constructor(options: GetDocumentsServiceOptions) {
        this.getDocumentStore = options.getDocumentStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const documentStore = this.getDocumentStore();

        const documents = await documentStore.find(inputs);
        return { documents };
    }
}