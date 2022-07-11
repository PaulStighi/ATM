/*
* Usage example:
* bzl/api/node easy.js
* http://localhost:8080/index.html?card_number=2123%201212&card_pin=1234&amount=200
* */
"use strict";
exports.__esModule = true;
var operator_config = "../../config/Operator/operator_config.json";
var OperatorDirector_1 = require("../lib/Operator/Builder/OperatorDirector");
var Operator_1 = require("./Operator");
var director = new OperatorDirector_1.OperatorDirector();
var api = new Operator_1.OperatorAPI(director.buildOperator(operator_config));

var http = require('http');
var url = require('url');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    res.write("<h1>"
                + api.login(q.card_number, q.card_pin) + "<br>"
                + "For credentials:<br>"
                + "Card number: " + q.card_number + "<br>"
                + "Card pin: " + q.card_pin + "<br>"
                + "</h1>");

    if(q.amount) {
        res.write("<h1>" 
                    + api.withdraw(q.amount, true) + "<br>"
                    + "For requested amount " + q.amount + "<br>"
                    + api.printAccSold() + "<br>"
                    + "</h1>");
    }
    else {
        res.write("<h1>" 
                    + api.printAccSold() 
                    + "</h1>");
    }

    res.write("<h1>" 
                + api.logout()
                + "</h1>");
});

server.listen(8080);