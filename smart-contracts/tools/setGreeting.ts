import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { Greeter } from "../typechain/Greeter"
import GreeterJSON from "../artifacts/contracts/Greeter.sol/Greeter.json"


const CONTRACT_ADDRESS = "0x7fddbf846A115F5708AD1a186fc22540c62395DB";
const RPC_URL = "https://chain.blktrc.planetenangst.de";
const ethAccount = {
    address: "0x20A881b4ad38058C35D68A0FAec44E80080F2192",
    secret: "0x221a47143c58591673f2f43395da8c956f917c48bf429f421f9fd1ec9d4ccb97"
};

const contract = new Contract(
    CONTRACT_ADDRESS,
    GreeterJSON.abi,
    new Wallet(
        ethAccount.secret,
        new JsonRpcProvider(RPC_URL)
    )
) as Greeter;


async function main() {
    const params = [...process.argv];
    params.shift();
    params.shift();

    const tx = await contract.setGreeting(new Date().toISOString());
    await tx.wait();
    const greeting = await contract.greet();
    console.log(greeting);
}


main()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
});

