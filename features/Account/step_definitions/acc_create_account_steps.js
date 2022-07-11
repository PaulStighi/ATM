const assert = require('assert');
const { Given, When, Then } = require('cucumber');
var Account = require("../../../bzl/lib/DataBase/Account").Account;
var Profile = require("../../../bzl/lib/DataBase/Profile").Profile;

Given('Account : Card Number for the new profile is {string}', function (string) {
    this.card_number = string;
});

Given('Account : Pin Code for the new profile is {int}', function (int) {
    this.card_pin = int;
});

Given('Account : Email adress for the new profile is {string}', function (string) {
    this.email = string;
});

Given('Account : Phone Number for the new profile is {string}', function (string) {
    this.phone_number = string;
});

Given('Account : Current Sold for the new account is {int}', function (int) {
    this.crt_sold = int;
})

When('Account : The constructor is creating the account object', function () {
    this.account = new Account(new Profile(this.card_number,this.card_pin,this.email,this.phone_number), this.crt_sold);
});

Then('Account : The profile card_number should be {string}', function (string) {
    assert.equal(this.account.getProfile().getCardNumber(), string);
});

Then('Account : The profile card_pin should be {int}', function (int) {
    assert.equal(this.account.getProfile().getCardPin(), int);
});

Then('Account : The profile email should be {string}', function (string) {
    assert.equal(this.account.getProfile().getEmail(), string);
});

Then('Account : The profile phone_number should be {string}', function (string) {
    assert.equal(this.account.getProfile().getPhoneNumber(), string);
});

Then('Account : The current sold should be {int}', function (int) {
    assert.equal(this.account.getCrtSold(), int);
})