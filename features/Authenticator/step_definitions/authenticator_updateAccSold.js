const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var AccAuthSyst = require("../../../bzl/lib/Authenticator/AccAuthSyst").AccAuthSyst;
var db_config = "C:\\Users\\Paul\\Desktop\\Coding\\ATM\\config\\DataBase\\db_config.json";
var authenticator = new AccAuthSyst(db_config);

Given('Authenticator : An Account with card number {string}', function (string) {
    this.card_number = string;
  });

Given('Authenticator : And pin code {int} is logged in', function (int) {
    this.card_pin = int;
    authenticator.login(this.card_number,this.card_pin);
});

Given('Authenticator : There is no Account logged in', function () {
});

When('Authenticator : The authenticator tries to updateAccSold with amount {int}', function (int) {
    if(authenticator.updateAccSold(int))
        this.actualAnswer = "successful";
    else
        this.actualAnswer = "unsuccessful";

    authenticator.logout();
});

Then('Authenticator : The answer of the updateAccSold should be {string}', function (string) {
    assert.equal(this.actualAnswer,string);
  });

Then('Authenticator : The new sold of the account should be {int}', function (int) {
    var acc = authenticator.accDB_proxy.extractAcc(this.card_number);
    assert.equal(acc.getCrtSold(), int);
  });
