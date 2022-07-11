"use strict";
exports.__esModule = true;
var SafeBox_1 = require("../SafeBox/SafeBox");
var errors_1 = require("../../../config/errors");
var BillBox = /** @class */ (function () {
    function BillBox(num_of_bills, bill_value) {
        this.reserved_bills = 0;
        if (bill_value > 0 && !(bill_value % 10)) {
            this.num_of_bills = num_of_bills;
            this.max_num = num_of_bills;
            this.bill_value = bill_value;
            this.safe_box = SafeBox_1.SafeBox.getInstance();
            this.safe_box.attachObserver(this);
        }
        else
            throw new Error("BillBox - constructor : " + errors_1.Errors.errorBadParameter);
    }
    BillBox.prototype.getNumOfBills = function () {
        return this.num_of_bills;
    };
    BillBox.prototype.getBillValue = function () {
        return this.bill_value;
    };
    BillBox.prototype.getFillPercent = function () {
        return this.num_of_bills / this.max_num;
    };
    BillBox.prototype.getMaxNum = function () {
        return this.max_num;
    };
    BillBox.prototype.updateNumOfBills = function (number_to_add) {
        if ((number_to_add * (-1)) <= this.num_of_bills) { // for a negative amount, the module still needs to be less than the current number of bills
            this.num_of_bills += number_to_add; // the given parameter is added to the current number of bills, for a negative param that means a substraction
        }
        else {
            throw new Error("BillBox - update : " + errors_1.Errors.errorBadParameter); // if the parameter is not respecting the requirements an error is thrown
        }
    };
    BillBox.prototype.sendBills = function (how_many) {
        if (how_many > 0 && how_many <= this.num_of_bills) { // the number of bills to send should be positive and less than the current number of bills
            this.safe_box.addMoneyInSafeBox(how_many * this.bill_value); // the amount consisting of the value of all the sent bills is given to the safebox
            this.reserved_bills = how_many * (-1); // the bills used for sending are reserved for a later update of the number of bills
        }
        else
            throw new Error("BillBox - send : " + errors_1.Errors.errorBadParameter); // if the parameter is not respecting the requirements an error is thrown 
    };
    BillBox.prototype.update = function () {
        this.updateNumOfBills(this.reserved_bills); // the reserved bills are now substracted from the number of bills
        this.reserved_bills = 0; // a reset of the reserved bills must be done
    };
    return BillBox;
}());
exports.BillBox = BillBox;
