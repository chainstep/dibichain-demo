import { JsonRpcProvider } from "@ethersproject/providers";


async function main(): Promise<void> {
    const params = [...process.argv];
    params.shift();
    params.shift();

    if (params[0] === "-h") {
        console.log("== Contract Deployment Checker ==");
        console.log("params[0]: rpc url")
        console.log("params[1]: contract address");
        process.exit();
    }

    if (!params[0]) {
        console.error("No rpc url provided");
        process.exit(2);
    }
    if (!params[1]) {
        console.error("No contract address provided");
        process.exit(2);
    }

    const rpcUrl = params[0];
    const address = params[1];

    const provider = new JsonRpcProvider(rpcUrl);
    try {
        const code = await provider.getCode(address);
        process.exit(code === "0x" ? 3 : 0);
    } catch (error) {
        console.error((<Error> error).message);
        process.exit(2);
    }
}

main();
