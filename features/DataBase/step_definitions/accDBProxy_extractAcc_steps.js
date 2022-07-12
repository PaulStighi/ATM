const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var Client = require("../../../bzl/lib/DataBase/AccDBClient").Client;
var db_config = "D:\\ATM\\config\\DataBase\\db_config.json";
var accDB_proxy = Client.getAccDBProxy(db_config);

Given('AccDBProxy : The card number for the account is {string}',function (string) {
    this.card_num = string;
});

When('AccDBProxy : The account is searched for with the proxy',function () {
    var acc = accDB_proxy.extractAcc(this.card_num);
    if(acc){
        this.actualAnswer = "found";
        accDB_proxy.setSession(acc);
    }
    else
        this.actualAnswer = "not found";
});

Then('AccDBProxy : The answer will be {string}', function (string) {
    assert.equal(this.actualAnswer,string);
});