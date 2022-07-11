const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var AccAuthSyst = require("../../../bzl/lib/Authenticator/AccAuthSyst").AccAuthSyst;
var Errors = require("../../../config/errors").Errors;
var db_config = "C:\\Users\\Paul\\Desktop\\Coding\\ATM\\config\\DataBase\\db_config.json";
var authenticator = new AccAuthSyst(db_config);

Given('Authenticator : An account is logged with card_number {string} and pin {int}', function (string,int) {
    authenticator.login(string,int);
});

Given('Authenticator : Another account tries to log in with {string} card number', function (string) {
    this.card_number = string;
});

Given('Authenticator : And with {int} card pin', function (int) {
    this.card_pin = int;
});

When('Authenticator : The authenticator tries to login with this credentials', function () {
    let obj = authenticator.login(this.card_number,this.card_pin);
    if(obj.ret){
        this.actualAnswer = "logged in";
        authenticator.logout();
    }
    else{
        this.actualAnswer = obj.message;
        if(obj.message === Errors.errorAnotherAccLoggedIn)
            authenticator.logout();
    }
});

Then('Authenticator : The Answer should be {string}', function (string) {
  assert.equal(this.actualAnswer, string);
});

