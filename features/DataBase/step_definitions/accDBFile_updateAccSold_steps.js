const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var AccDBFileFactory = require("../../../bzl/lib/DataBase/AccDBFileFactory").AccDBFileFactory;
var db_config = "C:\\Users\\Paul\\Desktop\\Coding\\ATM\\config\\DataBase\\db_config.json";
var factory = new AccDBFileFactory();
var acc_db;

Given('AccDB : The Database was already created and imported the accounts', function () {
    acc_db = factory.getAccDB(db_config);
});

Given('AccDB : The card number for the account to update is {string}',function (string) {
    this.card_num = string;
});

Given('AccDB : The updated sold is {int}',function (int) {
    this.new_sold = int;
});

When('AccDB : The account to update is searched for in DB',function () {
    if(acc_db.updateAccSold(this.card_num,this.new_sold))
        this.actualAnswer = "updated";
    else
        this.actualAnswer = "account not found";
});

Then('AccDB : The new sold will be {int}', function (int) {
    if(int)
        assert.equal(acc_db.extractAcc(this.card_num).getCrtSold(),int);
});

Then('AccDB : The Answer will be {string}', function (string) {
    assert.equal(this.actualAnswer,string);
});