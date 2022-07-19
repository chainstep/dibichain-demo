const https = require("https");
const fs = require("fs");


/*###################################################################################################
# MAIN
###################################################################################################*/

const params = [...process.argv];
params.shift();
params.shift();

if (params[0] === "-h") {
    showHelp();
    return;
}

const url = params[0];
const productJsonPath = params[1];

const data = createProductData(productJsonPath);
const options = createOptions(url);

const req = https.request(options, res => {
    res.on("data", d => {
        process.stdout.write(d);
    });
});

req.on("error", error => {
    console.error(error);
    process.exit(1);
});

req.write(data);
req.end();


/*###################################################################################################
# FUNCTIONS
###################################################################################################*/

function showHelp() {
    console.log("== Document Adder ==");
    console.log("params[0]: company url");
    console.log("params[1]: product json path");
}


function createProductData(productPath) {
    const data = fs.readFileSync(productPath).toString();
    return JSON.stringify(JSON.parse(data));
}


function createOptions(url) {
    return {
        hostname: url.startsWith("https://") ? url.replace("https://", "") : url,
        path: "/my-products",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
        },
    };
}