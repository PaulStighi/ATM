const { Given, When, Then } = require('cucumber');

Given('Operator : Card Number is {string}', function (string) {
    this.card_number = string;
});

Given('Operator : Pin Code is {int}', function (int) {
    this.card_pin = int;
});

Given('Operator : There is no session account logged in', function () {
});