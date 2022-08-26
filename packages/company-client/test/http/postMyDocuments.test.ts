import request from "supertest";
import { initHttpServer } from "../../src/http";
import { EnvVars } from "../../src/lib/EnvVars";
import { MyDocumentStore } from "../../src/storage/my-document/MyDocumentStore";
import { MyDocumentStoreInMemory } from "../../src/storage/my-document/MyDocumentStoreInMemory";
import { config } from "../config";
import { TEST_DOCUMENT_1, TEST_DOCUMENT_2 } from "../constants";


if (!config.skipTests.includes("postMyDocuments")) {
    const server = initHttpServer();
    const myDocumentStore = (<MyDocumentStoreInMemory> MyDocumentStore.get());

    beforeEach(async () => {
        myDocumentStore.clear();
    });


    it("should post my documents", async () => {
        await request(server)
            .post("/my-documents")
            .set("Origin", EnvVars.ALLOWED_ORIGINS[0])
            .send({
                myDocuments: [
                    TEST_DOCUMENT_1,
                    TEST_DOCUMENT_2
                ]
            })
            .expect(200);

        const myDocument1 = myDocumentStore.store[0];
        const myDocument2 = myDocumentStore.store[1];
        expect(myDocument1).toEqual(TEST_DOCUMENT_1);
        expect(myDocument2).toEqual(TEST_DOCUMENT_2);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}