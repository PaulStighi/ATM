const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var AccAuthSyst = require("../../../bzl/lib/Authenticator/AccAuthSyst").AccAuthSyst;
var Errors = require("../../../config/errors").Errors;
var db_config = "D:\\ATM\\config\\DataBase\\db_config.json";
var authenticator = new AccAuthSyst(db_config);

Given('Authenticator : An Account with Card Number {string}', function (string) {
    this.card_number = string;
  });

Given('Authenticator : And PIN {int} is logged in', function (int) {
    this.card_pin = int;
    authenticator.login(this.card_number,this.card_pin);
});

When('Authenticator : The authenticator tries to getAccSold', function () {
    if(authenticator.getAccSold())    
        this.actualAnswer = authenticator.getAccSold();
    else
        this.actualAnswer = Errors.errorNotLoggedIn;
    
    authenticator.logout();
});

Then('Authenticator : The answer of the getAccSold should be {string}', function (string) {
  assert.equal(this.actualAnswer, string);
});

