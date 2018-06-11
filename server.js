const http = require('http');
const fs = require("fs");
const filenameHeader = "./index(in_a_header).html";
const filenameBody = "./index(script_in_the end_of_body).html";

function app (req, res, type = 'body') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const fileName = type === 'header' ? filenameHeader : filenameBody;
    fs.readFile(fileName, "utf8", function(err, data) {
        res.write(data);
        res.end();
    });
}

function appHeader(req, res) {
    return app(req, res, 'header');
}

function appBody(req, res) {
    return app(req, res);
}

module.exports.appHeader = appHeader;
module.exports.appBody = appBody;
