const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var OperatorDirector = require("../../../bzl/lib/Operator/Builder/OperatorDirector").OperatorDirector;
var operator_config = "D:\\ATM\\config\\Operator\\operator_config.json";
var operator_director = new OperatorDirector();
var operator = operator_director.buildOperator(operator_config);

Given('OpFacade : Is logged-in', function () {
    operator.login(this.card_number,this.card_pin).ret;
});

Given('OpFacade : The amount to withdraw is {int}', function (int) {
    this.amount = int;
});

When('OpFacade : The operator facade tries to withdraw the amount', function () {
    operator.op_facade.safe_box.addMoneyInSafeBox(operator.op_facade.safe_box.getMoneyInSafeBox() * (-1));
    let obj = operator.op_facade.withdraw(this.amount,true,operator.authenticator.getAccSold());

    if(obj.ret)
        this.actualAnswer = "successful";
    else
        this.actualAnswer = obj.message;
        
    if(operator.authenticator.accDB_proxy.hasActiveSession())
        operator.logout();
});

Then('OpFacade : The answer of withdraw should be {string}', function (string) {
    assert.equal(this.actualAnswer,string); 
})
