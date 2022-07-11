"use strict";
exports.__esModule = true;
var _ = require('lodash');
var DescendingStrategy = /** @class */ (function () {
    function DescendingStrategy() {
        this.name = "DescendingStrategy";
    }
    // selecting a distribution of bills from the available bills in bill boxes
    DescendingStrategy.prototype.chooseDistribution = function (current_bills, amount) {
        var keys = Array.from(current_bills.keys());
        keys = _.orderBy(keys, [function (o) { return o; }], ['desc']);
        // chosen_bills[key] = number of bills form bill_boxes with bill value == key to be used for the distribution
        var chosen_bills = new Map();
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (current_bills.get(key) <= Math.floor(amount / key)) {
                chosen_bills.set(key, current_bills.get(key));
            }
            else {
                chosen_bills.set(key, Math.floor(amount / key));
            }
            amount -= chosen_bills.get(key) * key;
        }
        return chosen_bills;
    };
    return DescendingStrategy;
}());
exports.DescendingStrategy = DescendingStrategy;
