import { IMyDocumentStore } from "../../../../storage/my-document/IMyDocumentStore";
import { MyDocument } from "../../../../types";
import { RouteService } from "../../../routerFactory";


interface Options {
    myDocumentStore: IMyDocumentStore;
}

interface Inputs {
    myDocuments: MyDocument[]
}


export class PostMyDocumentsService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<void> {
        const myDocuments = inputs.myDocuments;
        for (let i = 0 ; i < myDocuments.length ; i++) {
            await this.options.myDocumentStore.upsert(myDocuments[i]);
        }
    }
}