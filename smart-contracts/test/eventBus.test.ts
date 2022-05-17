import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploy } from "./utils/deployer";

const product = {
    id: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    uid: "d3285b47-8ba9-4e40-ba43-a9ac325a0b1e",
    name: "Bionic Partition",
    Type: "Assembly",
    number: "EAN 20359483920",
    hash: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9"
};

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
        ).to.emit(eventBus, 'NewProduct').withArgs([
            'd3285b47-8ba9-4e40-ba43-a9ac325a0b1e',
            'd3285b47-8ba9-4e40-ba43-a9ac325a0b1e',
            'Bionic Partition',
            'Assembly',
            'EAN 20359483920',
            '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9',
          ]);
    });
});