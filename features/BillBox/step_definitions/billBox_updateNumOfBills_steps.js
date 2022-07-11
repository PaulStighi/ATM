const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var SafeBox = require("../../../bzl/lib/SafeBox/SafeBox").SafeBox;
var BillBox = require("../../../bzl/lib/BillBox/BillBox").BillBox;

var safe_box = SafeBox.getInstance();
var bill_box;

Given('BillBox : The billbox have been created and has {int}', function (int) {
    this.num = int;
});

Given('BillBox : Bills of value {int}', function (int) {
    bill_box = new BillBox(this.num,int,safe_box);
})

When('BillBox : The billbox is updated with {int} bills', function (int) {
    try {
        bill_box.updateNumOfBills(int);
    } catch (e) {
        this.actualAnswer = "Impossible to update";
    }
})

Then('BillBox : The updated number of bills is {int} bills', function (int) {
    assert.equal(bill_box.getNumOfBills(), int);
})

Then('BillBox : The answer of the update should be {string}', function (string) {
    assert.equal(this.actualAnswer,string);
})