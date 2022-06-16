import { IDocumentStore } from "../../../../storage/document/IDocumentStore";
import { Document } from "../../../../types";
import { RouteService } from "../../../routerFactory";


interface GetDocumentsServiceOptions {
    documentStore: IDocumentStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    documents: Document[];
}


export class GetDocumentsService implements RouteService {
    private readonly documentStore: IDocumentStore;


    constructor(options: GetDocumentsServiceOptions) {
        this.documentStore = options.documentStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const documents = await this.documentStore.find(inputs);
        return { documents };
    }
}