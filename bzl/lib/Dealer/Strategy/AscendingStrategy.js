"use strict";
exports.__esModule = true;
var _ = require('lodash');
var AscendingStrategy = /** @class */ (function () {
    function AscendingStrategy() {
        this.name = "AscendingStrategy";
    }
    // selecting a distribution of bills from the available bills in bill boxes
    AscendingStrategy.prototype.chooseDistribution = function (current_bills, amount) {
        var keys = Array.from(current_bills.keys());
        keys = _.orderBy(keys, [function (o) { return o; }], ['asc']);
        // chosen_bills[key] = number of bills form bill_boxes with bill value == key to be used for the distribution
        var chosen_bills = new Map();
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (current_bills.get(key) <= Math.ceil(amount / key)) {
                chosen_bills.set(key, current_bills.get(key));
            }
            else {
                chosen_bills.set(key, Math.ceil(amount / key));
            }
            amount -= chosen_bills.get(key) * key;
        }
        if (amount < 0) {
            for (var i = 0; i < keys.length && amount < 0; ++i) {
                if (amount / keys[i] === Math.ceil(amount / keys[i]) && (amount / keys[i]) * (-1) < chosen_bills.get(keys[i])) {
                    chosen_bills.set(keys[i], chosen_bills.get(keys[i]) - (amount / keys[i]) * (-1));
                    amount -= (amount / keys[i]) * (-1);
                }
            }
        }
        return chosen_bills;
    };
    return AscendingStrategy;
}());
exports.AscendingStrategy = AscendingStrategy;
