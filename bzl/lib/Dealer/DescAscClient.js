"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var StrategyClient_1 = require("./StrategyClient");
var _ = require('lodash');
var DescAscClient = /** @class */ (function (_super) {
    __extends(DescAscClient, _super);
    function DescAscClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DescAscClient.prototype.chooseStrategy = function (bill_boxes) {
        var fill_percents = new Map();
        bill_boxes.rewind(); // the billboxes iterator must be reinitialised
        process.stdout.write("\nRamaining bills : ");
        while (bill_boxes.valid()) { // the loop continues up untill there is no billbox lef to be iterated
            var current = bill_boxes.next(); // the current billbox is requested from the iterator
            process.stdout.write(current.getBillValue() + " => " + current.getNumOfBills() + " ");
            fill_percents.set(current.getBillValue(), current.getFillPercent()); // the filling percents is mapped with the bill values
        }
        var keys = Array.from(fill_percents.keys()); // the keys of the map are extracted (bill values)
        keys = _.orderBy(keys, [function (o) { return o; }], ['desc']); // the keys are sorted in ascending order
        process.stdout.write("\nFill Percents : ");
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            process.stdout.write(key + " => " + fill_percents.get(key) * 100 + "% ");
        }
        var type;
        if (fill_percents.get(keys[keys.length - 1]) <= fill_percents.get(keys[0]) + 0.2) { // if the filling percents of billbox with the smallest bill value is with more than 20% less then the bigest bill value
            type = "desc"; // then the needed strategy is descending
        }
        else {
            type = "asc"; // otherwise the needed strategy is ascending
        }
        return this.strategies.get(type); // the strategy is returned after being selected from the map
    };
    return DescAscClient;
}(StrategyClient_1.StrategyClient));
exports.DescAscClient = DescAscClient;
