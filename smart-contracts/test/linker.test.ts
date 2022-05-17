import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { arrayify, sha256, toUtf8Bytes } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { deploy } from "./utils/deployer";

interface Link {
    from: string;
    to: string;
    dataHash: string;
    tag: string;
    claims: {
        key: string;
        value: string;
    }[];
}

describe("Linker link", function() {
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        bob = signers[1];
    });


    it("Should create a link", async () => {
        const linker = await deploy();
        const link = <Link> {
            from: alice.address,
            to: bob.address,
            dataHash: "data-hash",
            tag: "some-tag",
            claims: [
                { key: "claim1", value: "claim1-value" },
                { key: "claim2", value: "claim2-value" }
            ]
        };
        const linkHash = createHash(link);
        const signature = await alice.signMessage(arrayify(linkHash));

        const tx = await linker.createLink(
            link.from,
            link.to,
            link.dataHash,
            link.tag,
            link.claims,
            signature
        );
        await tx.wait();
    });
});


function createHash(link: Link): string {
    return sha256(toUtf8Bytes(createNormalizedLink(link)));
}

function createNormalizedLink(link: Link): string {
    let normalizedLinkString = ""
    normalizedLinkString += link.from.toLowerCase(); // remove checksum
    normalizedLinkString += link.to.toLowerCase();
    normalizedLinkString += link.dataHash;
    normalizedLinkString += link.tag;
    
    link.claims.forEach(claim => {
        normalizedLinkString += claim.key;
        normalizedLinkString += claim.value;
    });

    return normalizedLinkString;
}