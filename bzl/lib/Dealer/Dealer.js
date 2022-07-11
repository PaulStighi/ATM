"use strict";
exports.__esModule = true;
var ArrayIterator_1 = require("../BillBox/ArrayIterator");
var ReturnObj_1 = require("../Operator/ReturnObj");
/* import { CaretakerMemento } from "../BillBox/CaretakerMemento"; */
var _ = require('lodash');
var Dealer = /** @class */ (function () {
    // private care_takers : ArrayIterator<CaretakerMemento>;
    function Dealer(bill_boxes, client) {
        /*  let care_takers : CaretakerMemento[] = [];
 
         for(let i = 0 ; i < bill_boxes.length ; ++i)
             care_takers[i] = new CaretakerMemento(bill_boxes[i]); */
        // this.care_takers = new ArrayIterator<CaretakerMemento>(care_takers);
        this.bill_boxes = new ArrayIterator_1.ArrayIterator(bill_boxes);
        this.client = client;
    }
    Dealer.prototype.handleSum = function (amount) {
        var current_bills = new Map(); // the current number of bills from each billbox must be consulted
        this.bill_boxes.rewind(); // the billboxes iterator must be reinitialised
        while (this.bill_boxes.valid()) { // the loop continues up untill there is no billbox lef to be iterated
            var current = this.bill_boxes.next(); // the current billbox is requested from the iterator
            current_bills.set(current.getBillValue(), current.getNumOfBills()); // the current bills number of that billbox is mapped with the bill value
        }
        var strategy = this.client.chooseStrategy(this.bill_boxes);
        process.stdout.write("\n" + strategy.name + " - ");
        var chosen_bills = strategy.chooseDistribution(current_bills, amount); // the selected strategy tries to choose a distribution of bills to cover the requested amount 
        var retVal = this.strategyOfDistribution(amount, chosen_bills);
        console.log(retVal.message);
        if (retVal.ret) // if the distribution covers the requested amount, the handling is successful
            return retVal.message;
        else
            return null;
    };
    Dealer.prototype.billBoxesCheck = function () {
        var bill_boxes_for_service = [];
        this.bill_boxes.rewind(); // the billboxes iterator must be reinitialised
        while (this.bill_boxes.valid()) { // the loop continues up untill there is no billbox lef to be iterated
            var current = this.bill_boxes.next(); // the current billbox is requested from the iterator
            if (current.getFillPercent() <= 0.2) { // if the fill percent of the current billbox is less than 20%
                bill_boxes_for_service.push(current); // then the current billbox is set for maintenance
            }
        }
        return bill_boxes_for_service;
    };
    Dealer.prototype.strategyOfDistribution = function (amount, chosen_bills) {
        var res = "";
        res += (amount.toString() + " : ");
        process.stdout.write(amount.toString() + " : ");
        var keys = Array.from(chosen_bills.keys()); // the keys of the map are extracted
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) { // for every key      
            var key = keys_1[_i];
            amount -= chosen_bills.get(key) * key; // the value of the bills chosen with that bill_value is subtracted
            res += (key + " => " + chosen_bills.get(key) + " ");
            process.stdout.write(key + " => " + chosen_bills.get(key) + " ");
        }
        console.log();
        if (amount == 0) { // if the amount was fully covered
            this.bill_boxes.rewind(); // the billboxes iterator must be reinitialised       
            // this.care_takers.rewind();
            while (this.bill_boxes.valid() /* && this.care_takers.valid() */) { // the loop continues up untill there is no billbox lef to be iterated
                var currentb = this.bill_boxes.next(); // the current billbox is requested from the iterator
                // let currentc : CaretakerMemento = this.care_takers.next();
                // currentc.backup();
                if (chosen_bills.get(currentb.getBillValue())) { // if there are bills chosen for the current billbox
                    currentb.sendBills(chosen_bills.get(currentb.getBillValue())); // the current billbox sents the value of the chosen bills to the safebox and reserves that number of bills
                }
            }
            return new ReturnObj_1.ReturnObj(true, res); // the distribution was successful
        }
        else {
            console.log("failed\n");
            return new ReturnObj_1.ReturnObj(false, ""); // if there is still amount not covered, then the distribution failed
        }
    };
    return Dealer;
}());
exports.Dealer = Dealer;
