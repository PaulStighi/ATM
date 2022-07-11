const { Given, When, Then } = require('cucumber');

Given('OpFacade : Card Number is {string}', function (string) {
    this.card_number = string;
});

Given('OpFacade : Pin Code is {int}', function (int) {
    this.card_pin = int;
});

Given('OpFacade : There is no session account logged in', function () {
});