const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var OperatorDirector = require("../../../bzl/lib/Operator/Builder/OperatorDirector").OperatorDirector;
var operator_config = "D:\\ATM\\config\\Operator\\operator_config.json";
var operator_director = new OperatorDirector();
var operator;

Given('SafeBox : The operator is instantiated', function () {
    operator = operator_director.buildOperator(operator_config);
});

Given('SafeBox : The operator asks for an addMoneyInSafeBox', function () {
    operator.op_facade.safe_box.addMoneyInSafeBox(100);
})

When('SafeBox : The money in SafeBox is compared',function () {
    //console.log(operator.op_facade.safe_box.getMoneyInSafeBox());
    this.money = operator.op_facade.safe_box.getMoneyInSafeBox();

    for(let i = 0 ; i < operator.op_facade.dealer.bill_boxes.array.length ; ++i)
        if(this.money != operator.op_facade.dealer.bill_boxes.array[i].safe_box.getMoneyInSafeBox())
            return;
        
    this.actualAnswer = "equal";
});

Then('SafeBox : The answer should be {string}', function (string) {
    assert.equal(this.actualAnswer,string);
    operator.op_facade.safe_box.addMoneyInSafeBox((-1) * operator.op_facade.safe_box.getMoneyInSafeBox());
})

