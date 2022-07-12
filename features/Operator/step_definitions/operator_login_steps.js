const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var OperatorDirector = require("../../../bzl/lib/Operator/Builder/OperatorDirector").OperatorDirector;
var operator_config = "D:\\ATM\\config\\Operator\\operator_config.json";
var operator_director = new OperatorDirector();
var operator = operator_director.buildOperator(operator_config);

When('Operator : The ATM tries to login with this credentials', function () {
    let obj = operator.login(this.card_number,this.card_pin);
    
    if(obj.ret){
        this.actualAnswer = "logged in";
        operator.logout();
    }
    else
        this.actualAnswer = obj.message;
});

Then('Operator : The answer of login should be {string}', function (string) {
  assert.equal(this.actualAnswer, string);
});

