import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploy } from "./utils/deployer";


const product = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1a",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    Type: "Assembly",
    number: "EAN 20359483920",
    hash: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
};

const RSA_PUB_KEY = "-----BEGIN RSA PUBLIC KEY-----\n" +
                    "MIIBCgKCAQEA4cHLrQ5lgyjP/idKwlsnp0+nhvY1BhwE39Dxn8no6DbDl/W0RRVM\n" +
                    "eSiP4Ny1AoUzalkzr0fmugUIy6skmuePqqXbes/4aCisJMB86izQeGZhac2k8ofk\n" +
                    "9ivedD4VOOcSLqenMVRdqG/1jFxQmwtfe7pt0Mw0AorYN8d5fXLGPFDjXKaO7cfr\n" +
                    "OBWY4AQlKF5tkiTiwXoqorjIBl+2S3dh+/xzYHMyF46s9sDkHkmpNK1JquFK8VJw\n" +
                    "s8PZHnw6o+C2/i+Ea1ZAkgU/3ta6ztX/5Ak2F9HFAp6tMLqK3Ac+A1T45tb46NaJ\n" +
                    "iVocbo+Nrht97J2OnvCd2tmGsxeaiMZ2AwIDAQAB\n" +
                    "-----END RSA PUBLIC KEY-----\n";
const ALGORITHM = "rsa:pem:PKCS1_OAEP_PADDING:sha256";


describe("Events", function() {
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        bob = signers[1];
    });


    it("Should emit a new product event", async () => {
        const eventBus = await deploy();
        await expect(
            eventBus.broadcastNewProduct(product)
        ).to.emit(eventBus, 'NewProduct').withArgs(
            product.uid,
            [
                product.uid,
                product.id,
                product.name,
                product.Type,
                product.number,
                product.hash
            ]
        );
    });


    it("Should emit a product details request event", async () => {
        const eventBus = await deploy();
        await expect(
            eventBus.broadcastProductDetailsRequest({
                uid: product.uid,
                publicKey: RSA_PUB_KEY,
                algorithm: ALGORITHM
            })
        ).to.emit(eventBus, 'ProductDetailsRequest').withArgs(
            product.uid,
            [
                product.uid,
                RSA_PUB_KEY,
                ALGORITHM
            ]
        );
    });
});