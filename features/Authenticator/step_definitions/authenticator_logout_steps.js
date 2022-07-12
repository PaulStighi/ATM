const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var AccAuthSyst = require("../../../bzl/lib/Authenticator/AccAuthSyst").AccAuthSyst;
var Errors = require("../../../config/errors").Errors;
var db_config = "D:\\ATM\\config\\DataBase\\db_config.json";
var authenticator = new AccAuthSyst(db_config);

Given('Authenticator : An account with card_number {string}', function (string) {
    this.card_number = string;
  });

Given('Authenticator : And pin {int} is logged in', function (int) {
    this.card_pin = int;
    authenticator.login(this.card_number,this.card_pin);
});

When('Authenticator : The authenticator tries to logout', function () {
    if(authenticator.logout().ret)
        this.actualAnswer = "logged out";
    else
        this.actualAnswer = Errors.errorNoSessionLogout;
});

Then('Authenticator : The answer of the logout should be {string}', function (string) {
  assert.equal(this.actualAnswer, string);
});

