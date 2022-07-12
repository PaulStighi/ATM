const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var AccDBFFileFactory = require("../../../bzl/lib/DataBase/AccDBFileFactory").AccDBFileFactory;
var db_config = "D:\\ATM\\config\\DataBase\\db_config.json";
var factory = new AccDBFFileFactory();
var acc_db;

Given('AccDBFile : The database was already created and imported the accounts', function () {
    acc_db = factory.getAccDB(db_config);
});

Given('AccDBFile : The card number for the account is {string}',function (string) {
    this.card_num = string;
});

When('AccDBFile : The account is searched for in DB',function () {
    if(acc_db.extractAcc(this.card_num))
        this.actualAnswer = "found";
    else
        this.actualAnswer = "not found";
});

Then('AccDBFile : The answer will be {string}', function (string) {
    assert.equal(this.actualAnswer,string);
});