import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyDocumentStore } from "../../src/storage/my-document/MyDocumentStore";
import { MyDocumentStoreInMemory } from "../../src/storage/my-document/MyDocumentStoreInMemory";
import { MyDocument } from "../../src/types";
import { config } from "../config";
import { TEST_DOCUMENT_1 } from "../data";


if (!config.skipTests.includes("getMyDocuments")) {
    const server = initHttpServer();
    const myDocumentStore = (<MyDocumentStoreInMemory> MyDocumentStore.get());

    beforeEach(async () => {
        myDocumentStore.clear();
    });


    it("should get all my documents", async () => {
        await myDocumentStore.upsert(TEST_DOCUMENT_1);

        const response = await request(server)
            .get("/my-documents")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .expect(200);

        const myDocuments = <MyDocument[]> response.body.data.myDocuments;
        expect(myDocuments.length).toEqual(1);
        expect(myDocuments[0]).toEqual(TEST_DOCUMENT_1);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}