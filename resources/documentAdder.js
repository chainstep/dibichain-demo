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
const uid = params[1];
const documentPath = params[2];
const version = params[3];

const data = JSON.stringify({ myDocuments: [ createDocumentData(uid, documentPath, version) ] });
const options = createOptions(url);

sendRequest(url, options, data);


/*###################################################################################################
# FUNCTIONS
###################################################################################################*/

function showHelp() {
    console.log("== Document Adder ==");
    console.log("params[0]: company url");
    console.log("params[1]: document uid");
    console.log("params[2]: document path");
    console.log("params[3]: version");
}


function createDocumentData(uid, documentPath, version) {
    const data = fs.readFileSync(documentPath).toString("base64");
    
    const documentPieces = documentPath.split(".");
    const type = documentPieces.slice(-1)[0];
    const name = documentPieces.slice(-2)[0].split("/").slice(-1)[0];
    
    return {
        uid: uid,
        name: name,
        type: type,
        timestamp: Math.floor(Date.now() / 1000),
        data: data,
        version: version || "1.0"
    }
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
        path: "/my-documents",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
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