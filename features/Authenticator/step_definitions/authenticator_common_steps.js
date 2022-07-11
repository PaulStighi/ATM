const { Given, When, Then } = require('cucumber');

Given('Authenticator : Card Number is {string}', function (string) {
    this.card_number = string;
});

Given('Authenticator : Pin Code is {int}', function (int) {
    this.card_pin = int;
});

Given('Authenticator : There is no session account logged in', function () {
});