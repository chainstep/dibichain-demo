function main() {
    const params = [...process.argv];
    params.shift();
    params.shift();

    if (params[0] === "-h") {
        console.log("== Gas to Eth calculator ==");
        console.log("params[0]: gas amount");
        console.log("params[1]: gas price [GWEI]");
        console.log("params[2]: eth price (optional)");
        return;
    }

    const gas = Number(params[0]);
    const gasPrice = Number(params[1]);
    const ethPrice = (gas * gasPrice) / 1000000000;

    if (params[2]) {
        console.log(`Price: ${ethPrice * Number(params[2])} Fiat`);
    } else {
        console.log(`Price: ${ethPrice} ETH`);
    }
}

main();
