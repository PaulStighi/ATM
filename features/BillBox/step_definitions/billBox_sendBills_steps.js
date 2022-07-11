const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var SafeBox = require("../../../bzl/lib/SafeBox/SafeBox").SafeBox;
var BillBox = require("../../../bzl/lib/BillBox/BillBox").BillBox;

var safe_box = SafeBox.getInstance();
var bill_box;

Given('BillBox : The Billbox have been created and has {int} bills', function (int) {
    this.num = int;
});

Given('BillBox : Bills of Value {int}', function (int) {
    bill_box = new BillBox(this.num,int,safe_box);
});

When('BillBox : {int} bills are sent to the safebox', function (int) {
    try {
        bill_box.sendBills(int);
    } catch (e) {
        this.actualAnswer = "Impossible to send";
    }
});

Then('BillBox : The number of bills sent is {int} bills', function (int) {
    assert.equal(safe_box.getMoneyInSafeBox() / bill_box.getBillValue(), int);
    safe_box.unlockSafeBox();
    safe_box.lockSafeBox();
});

Then('BillBox : The answer of the send should be {string}', function (string) {
    assert.equal(this.actualAnswer,string);
});