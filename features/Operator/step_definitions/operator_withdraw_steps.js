const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var OperatorDirector = require("../../../bzl/lib/Operator/Builder/OperatorDirector").OperatorDirector;
var operator_config = "C:\\Users\\Paul\\Desktop\\Coding\\ATM\\config\\Operator\\operator_config.json";
var operator_director = new OperatorDirector();
var operator = operator_director.buildOperator(operator_config);

Given('Operator : Is logged-in', function () {
    operator.login(this.card_number,this.card_pin).ret;
});

Given('Operator : The amount to withdraw is {int}', function (int) {
    this.amount = int;
});

When('Operator : The operator tries to withdraw the amount', function () {
    let obj = operator.withdraw(this.amount,true);

    if(obj.ret)
        this.actualAnswer = "successful";
    else
        this.actualAnswer = obj.message;
        
    if(operator.authenticator.accDB_proxy.hasActiveSession())
        operator.logout();
});

Then('Operator : The answer of withdraw should be {string}', function (string) {
    assert.equal(this.actualAnswer,string); 
})
