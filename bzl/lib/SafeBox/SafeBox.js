"use strict";
exports.__esModule = true;
var errors_1 = require("../../../config/errors");
var SafeBox = /** @class */ (function () {
    function SafeBox() {
        this.locked = true;
        this.money_in_safe_box = 0;
        this.observers = [];
    }
    SafeBox.prototype.getMoneyInSafeBox = function () {
        return this.money_in_safe_box;
    };
    SafeBox.getInstance = function () {
        if (!this.instance)
            this.instance = new SafeBox(); // if it is the first request of instance, a new instance is created
        return SafeBox.instance;
    };
    SafeBox.prototype.addMoneyInSafeBox = function (amount) {
        if (this.locked) { // only if the safebox is locked
            this.money_in_safe_box += amount;
            return true;
        }
        else
            throw new Error(errors_1.Errors.errorStuckSafeBox); // otherwise an error is thrown
    };
    SafeBox.prototype.unlockSafeBox = function () {
        if (this.locked) { // only if the safebox is locked
            this.locked = false; // change the state of locking
            console.log(this.money_in_safe_box + " : ejected amount\n");
            this.money_in_safe_box = 0; // the money are taken from the safebox
            this.notify(); // the observers are notified that the unlock event took place
            return true; // the unlock operation was successful
        }
        else
            return false; // otherwise the unlock fails
    };
    SafeBox.prototype.lockSafeBox = function () {
        if (!this.locked) { // only if the safebox is unlocked
            this.locked = true; // change the state of locking
            return true; // the lock operation was successful
        }
        else
            return false; // otherwise the lock fails
    };
    SafeBox.prototype.attachObserver = function (observer) {
        this.observers.push(observer);
    };
    SafeBox.prototype.notify = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var ob = _a[_i];
            ob.update();
        }
    };
    SafeBox.instance = null; // the same instance is returned every time
    return SafeBox;
}());
exports.SafeBox = SafeBox;
