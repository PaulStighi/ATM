const assert = require('assert');
const { Given, When, Then } = require('cucumber');
var SafeBox = require("../../../bzl/lib/SafeBox/SafeBox").SafeBox;

var safe_box = SafeBox.getInstance();

Given('SafeBox : SafeBox is unlocked', function () {
    safe_box.unlockSafeBox();
});

When('SafeBox : {int} is added in the safebox', function (int) {
    try {
        safe_box.addMoneyInSafeBox(int);
    } catch (e) {
        this.actualAnswer = e.message;
    }
});

Then('SafeBox : The new amount inside is {int}', function (int) {
    assert.equal(safe_box.getMoneyInSafeBox(),int); 
});

Then('SafeBox : The answer for the adding should be {string}', function (string) {
    assert.equal(this.actualAnswer, string);
    safe_box.lockSafeBox();
});