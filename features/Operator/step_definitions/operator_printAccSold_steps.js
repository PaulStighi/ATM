const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var OperatorDirector = require("../../../bzl/lib/Operator/Builder/OperatorDirector").OperatorDirector;
var operator_config = "C:\\Users\\Paul\\Desktop\\Coding\\ATM\\config\\Operator\\operator_config.json";
var operator_director = new OperatorDirector();
var operator = operator_director.buildOperator(operator_config);

Given('Operator : Is logged in', function () {
    operator.login(this.card_number,this.card_pin);
});

When('Operator : The operator tries to printAccSold', function () {
    if(operator.printAccSold().ret)
        this.actualAnswer = "successful";
    else
        this.actualAnswer = "Not logged in!";

    operator.logout();
});

Then('Operator : The answer of printAccSold should be {string}', function (string) {
    assert.equal(this.actualAnswer, string);
  });

