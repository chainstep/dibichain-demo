import crypto from "crypto";
import { ethers } from "ethers";


function main() {
    const params = [...process.argv];
    params.shift();
    params.shift();

    if (params[0] === "-h") {
        console.log("== Account Generator ==");
        console.log("params[0]: account secret (optional)");
        return;
    }

    const secret = params[0] || "0x" + crypto.randomBytes(32).toString("hex");
    const wallet = new ethers.Wallet(secret);
    const address = wallet.address;
    console.log({ address, secret });
}

main();
