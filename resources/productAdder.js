const https = require("https");
const http = require("http");
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

sendRequest(url, options, data);


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
    const domainAndPort = url.startsWith("https://")
                        ? url.replace("https://", "")
                        : url.startsWith("http://")
                        ? url.replace("http://", "")
                        : url;
    const domainAndPortArray = domainAndPort.split(":");
    const domain = domainAndPortArray[0];
    const port = domainAndPortArray[1];


    let options = {
        hostname: domain,
        path: "/my-products",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length
        }
    };

    if (port) {
        options.port = port;
    }

    return options;
}


function sendRequest(url, options, data) {
    let request;

    if (url.startsWith("http://")){
        request = http.request(options, response => {
            response.on("data", data => {
                process.stdout.write(data);
            });
        });
    } else if(url.startsWith("https://")) {
        request = https.request(options, response => {
            response.on("data", data => {
                process.stdout.write(data);
            });
        });
    } else {
        console.error("wrong protocol");
        process.exit(1);
    }

    request.on("error", error => {
        console.error(error);
        process.exit(1);
    });
    
    request.write(data);
    request.end();
}