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

const RSA_PUB_KEY = "AAAAB3NzaC1yc2EAAAADAQABAAABgQDAaOiwZ7yOJuAZrBRghd0CU2J8oVHVU6WCJA891itgvB/psn83oVN2oGpPz+fDocuUL/Z12ell9Q/WryPnZ3qTNZEQZxGAu68Fq4Z36Rm9me4cmbQbnPiZAI8lbhnkqEPCNGN6mQbbmpiVUIQp0xCqlSahCzDiagn5wmkNmgdp0qqGidnLXSpea2bSW34vuNcaPy8AHRZmRN7kUC/yKq2FNWKo5kFCIMvR9UdHVTiQ7a+bcM2d0WVN+JSn2xtCZP1fGTLeRuJdp6agz/qGNZ7D5n4Vrjif/KeexZLsM71v59mX8RGxogB9VEZRNu+XDDlL9rOeCSVQ6MgAEF7dmgwQZ/ZRjgVyHuJXyV/aMEK1ruA4u+vyG0bHdH5EC5ZQzYIqmWI0zVVvcxW4m8KHyXBUcoCRXv96b08qeTgO5z7NVMIBEqRaM4nUibbmwsAcK+4MhnjjfGz/jjaNQCrBL906+ufJiSK9R3VKBoDRVM0bKR8RsZ41GFmb+d1hVdFCCv0=";
const ALGORITHM = "rsa";


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
                pubKey: RSA_PUB_KEY,
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