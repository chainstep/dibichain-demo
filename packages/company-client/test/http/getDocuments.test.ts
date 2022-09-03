import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { DocumentStore } from "../../src/storage/document/DocumentStore";
import { DocumentStoreInMemory } from "../../src/storage/document/DocumentStoreInMemory";
import { MyDocument } from "../../src/types";
import { config } from "../config";
import { TEST_DOCUMENT_1 } from "../data";


if (!config.skipTests.includes("getDocuments")) {
    const server = initHttpServer();
    const documentStore = (<DocumentStoreInMemory> DocumentStore.get());

    beforeEach(async () => {
        documentStore.clear();
    });


    it("should get all documents", async () => {
        await documentStore.upsert(TEST_DOCUMENT_1);

        const response = await request(server)
            .get("/documents")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);

        const documents = <MyDocument[]> response.body.data.documents;
        expect(documents.length).toEqual(1);
        expect(documents[0]).toEqual(TEST_DOCUMENT_1);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}