const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var OperatorDirector = require("../../../bzl/lib/Operator/Builder/OperatorDirector").OperatorDirector;
var operator_config = "D:\\ATM\\config\\Operator\\operator_config.json";
var operator_director = new OperatorDirector();
var operator = operator_director.buildOperator(operator_config);

Given('OpFacade : The sold is {int}', function (int) {
    this.sold = int;
});

Given('OpFacade : The Amount to withdraw is {int}', function (int) {
    this.amount = int;
});

Given('OpFacade : The error amount left inside the safebox is {int}', function (int) {
    operator.op_facade.safe_box.addMoneyInSafeBox(operator.op_facade.safe_box.getMoneyInSafeBox() * (-1));
    operator.op_facade.safe_box.addMoneyInSafeBox(int);
})

When('OpFacade : The operator Facade tries to withdraw the amount', function () {  
    let obj = operator.op_facade.withdraw(this.amount,true,this.sold);

    if(obj.ret)
        this.actualAnswer = "successful";
    else
        this.actualAnswer = obj.message;

    operator.op_facade.dealer.bill_boxes.rewind();
    process.stdout.write("Ramaining bills : ");

    while(operator.op_facade.dealer.bill_boxes.valid()){
        let currentb = operator.op_facade.dealer.bill_boxes.next();
        process.stdout.write(currentb.getBillValue() + " => " + currentb.getNumOfBills() + " ");
    }
    console.log();
});

Then('OpFacade : The answer of Withdraw should be {string}', function (string) {
    assert.equal(this.actualAnswer,string); 
})
