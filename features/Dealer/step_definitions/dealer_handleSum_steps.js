const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var SafeBox = require("../../../bzl/lib/SafeBox/SafeBox").SafeBox;
var BillBox = require("../../../bzl/lib/BillBox/BillBox").BillBox;
var Dealer = require("../../../bzl/lib/Dealer/Dealer").Dealer;
var DescAscClient = require("../../../bzl/lib/Dealer/DescAscClient").DescAscClient;

var safe_box = SafeBox.getInstance();
var bill_boxes = [new BillBox(10, 100, safe_box), new BillBox(10, 200, safe_box), new BillBox(10, 50, safe_box), new BillBox(10, 10, safe_box)];
var dealer = new Dealer(bill_boxes,new DescAscClient());

Given('Dealer : The amount to handle is {int}', function (int) {
    this.amount = int;
})

When('Dealer : The Dealer tries to handle it', function () {
    if(dealer.handleSum(this.amount))
        this.actualAnswer = "can be handled";
    else
        this.actualAnswer = "can't be handled";
})

Then("Dealer : The answer should be {string}", function (string) {
    assert.equal(this.actualAnswer, string);
})