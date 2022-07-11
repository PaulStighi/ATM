const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var BillBox = require("../../../bzl/lib/BillBox/BillBox").BillBox;
var SafeBox = require("../../../bzl/lib/SafeBox/SafeBox").SafeBox;

Given('Observer : The observer is created with {int}, {int} and attached to the subject', function (int1, int2) {
    this.bill_box = new BillBox(int1, int2);
    this.safe_box = SafeBox.getInstance();
    this.bill_box.sendBills(10);
});

When('Observer : The subject changes it\'s state', function () {
    this.safe_box.unlockSafeBox();
    this.safe_box.lockSafeBox();
});

Then('Observer : The observer acts regarding the notification : {int}', function (int) {
    assert.equal(this.bill_box.getNumOfBills(),int);
});