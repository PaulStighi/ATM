const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var BillBox = require("../../../bzl/lib/BillBox/BillBox").BillBox;
var Dealer = require("../../../bzl/lib/Dealer/Dealer").Dealer;
var DescAscClient = require("../../../bzl/lib/Dealer/DescAscClient").DescAscClient;
var SafeBox = require("../../../bzl/lib/SafeBox/SafeBox").SafeBox;
const operator_config = "C:\\Users\\Paul\\Desktop\\Coding\\ATM\\config\\Operator\\operator_config.json";
var _ = require('lodash');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync(operator_config, 'utf8'));
var dealer;

var bill_boxes = [];

for(let i = 0 ; i < data.bill_boxes.length ; ++i){                                      
    let element = new BillBox(+data.bill_boxes[i].bills_number, 
                                +data.bill_boxes[i].bill_value);
    bill_boxes.push(element);                                                          
}

if(data.strategy_client === "DescAsc") {
    dealer = new Dealer(bill_boxes,new DescAscClient());                                
}

Given('Client : The operation number is {int}', function (int) {
    this.step = int;    
});

Given('Client : The amount to hadle is {int}', function (int) {
    this.amount = int;
});

When('Client : The dealer hadles the amount', function () {
    this.actualAnswer = dealer.client.chooseStrategy(dealer.bill_boxes).name;
    dealer.handleSum(this.amount);
    SafeBox.getInstance().unlockSafeBox();
    SafeBox.getInstance().lockSafeBox();
});

Then('Client : The strategy used will be {string}', function (string) {
    assert.equal(this.actualAnswer, string); 
});

/* When('Client : The dealer asks for the fillpercents of the billboxes', function () {
    dealer.bill_boxes.rewind();
    this.fill_percents = new Map();

    while(dealer.bill_boxes.valid()){                                                               
        let current = dealer.bill_boxes.next();
        this.fill_percents.set(current.getBillValue(),current.getFillPercent()); 
    }

    let keys = Array.from(dealer.bill_boxes);
    keys = _.orderBy(keys, [ function(o){ return o; } ], ['asc']);

    for(let key of keys) {
        console.log(1);
        console.log(key + " => " + this.fill_percents.get(key) + "% ");
    }
});

Then('They should be {string}', function () {
    assert.equal(this.config, string);
}); */