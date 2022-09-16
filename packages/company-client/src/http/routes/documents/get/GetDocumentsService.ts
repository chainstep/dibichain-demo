import { IDocumentStore } from "../../../../storage/document/IDocumentStore";
import { Document } from "../../../../types";
import { RouteService } from "../../../routerFactory";


interface Options {
    documentStore: IDocumentStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    documents: Document[];
}


export class GetDocumentsService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const documents = await this.options.documentStore.find(inputs);
        return { documents };
    }
}