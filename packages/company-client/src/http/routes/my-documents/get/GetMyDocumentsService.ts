import { IMyDocumentStore } from "../../../../storage/my-document/IMyDocumentStore";
import { MyDocument } from "../../../../types";
import { RouteService } from "../../../routerFactory";


interface ServiceOptions {
    myDocumentStore: IMyDocumentStore;
}

interface Inputs {
    uid?: string;
}

interface Outputs {
    myDocuments: MyDocument[];
}


export class GetMyDocumentsService implements RouteService {
    constructor(private readonly options: ServiceOptions) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const myDocuments = await this.options.myDocumentStore.find(inputs);
        return { myDocuments };
    }
}