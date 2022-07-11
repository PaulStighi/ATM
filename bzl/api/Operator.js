"use strict";
exports.__esModule = true;
var OperatorAPI = /** @class */ (function () {
    function OperatorAPI(op) {
        this.operatorLIB = null;
        this.operatorLIB = op;
    }
    OperatorAPI.prototype.login = function (card_number, card_pin) {
        var retVal = this.operatorLIB.login(card_number, card_pin);
        if (retVal.ret)
            return ("Login successful");
        else
            return (retVal.message);
    };
    OperatorAPI.prototype.printAccSold = function () {
        var retVal = this.operatorLIB.printAccSold();
        return (retVal.message);
    };
    OperatorAPI.prototype.withdraw = function (amount, need_receipt) {
        var retVal = this.operatorLIB.withdraw(amount, need_receipt);
        if (retVal.ret)
            return ("Withdraw successful<br>" + retVal.message);
        else
            return (retVal.message);
    };
    OperatorAPI.prototype.logout = function () {
        var retVal = this.operatorLIB.logout();
        if (retVal.ret)
            return ("Logout successful");
        else
            return (retVal.message);
    };
    return OperatorAPI;
}());
exports.OperatorAPI = OperatorAPI;
