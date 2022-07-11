"use strict";
exports.__esModule = true;
var operator_config = "../../config/Operator/operator_config.json";
var OperatorDirector_1 = require("../lib/Operator/Builder/OperatorDirector");
var Operator_1 = require("./Operator");
var director = new OperatorDirector_1.OperatorDirector();
var api = new Operator_1.OperatorAPI(director.buildOperator(operator_config));

var http = require('http');
var url = require('url');
var fs = require('fs');

const server = http.createServer((req, res) => {

    let pathname = url.parse(req.url).pathname;

    console.log(`Request for ${pathname} received`);

    if (pathname == '/') {
        pathname = '/index.html';
    }

    fs.readFile('docs/' + pathname.substr(1), (err, data) => {
        if (err) {

            console.error(err);

            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 - file not found');

        } else {

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString());
        }
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    var txt = q.card_number + " " + q.card_pin;
    res.write(txt);
});

server.listen(8080);