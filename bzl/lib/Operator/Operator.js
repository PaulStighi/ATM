"use strict";
exports.__esModule = true;
var ReturnObj_1 = require("./ReturnObj");
var errors_1 = require("../../../config/errors");
var Operator = /** @class */ (function () {
    function Operator() {
        this.authenticator = null;
        this.op_facade = null;
    }
    Operator.prototype.setAuthenticator = function (authenticator) {
        this.authenticator = authenticator;
    };
    Operator.prototype.setOpFacade = function (op_facade) {
        this.op_facade = op_facade;
    };
    Operator.prototype.login = function (card_number, card_pin) {
        return this.authenticator.login(card_number, card_pin);
    };
    Operator.prototype.logout = function () {
        return this.authenticator.logout();
    };
    Operator.prototype.printAccSold = function () {
        if (this.authenticator.hasActiveSession()) { // the sold can't be printed without an active session
            var sold = this.authenticator.getAccSold();
            return this.op_facade.printAccSold(sold);
        }
        else {
            return new ReturnObj_1.ReturnObj(false, errors_1.Errors.errorNotLoggedIn);
        }
    };
    Operator.prototype.withdraw = function (amount, need_receipt) {
        if (!this.authenticator.hasActiveSession()) { // a withdraw operation can't be done without an active session
            return new ReturnObj_1.ReturnObj(false, errors_1.Errors.errorNotLoggedIn);
        }
        if (amount > this.authenticator.getAccSold()) { // the asked sum should be less then the account sold
            return new ReturnObj_1.ReturnObj(false, errors_1.Errors.errorNotEnoghMoneyInSold);
        }
        var return_obj = this.op_facade.withdraw(amount, need_receipt, this.authenticator.getAccSold());
        if (return_obj.ret) { // if the withdraw was successful
            if (!this.authenticator.updateAccSold(amount)) // if the account sold update fails
                return new ReturnObj_1.ReturnObj(false, errors_1.Errors.errorInternalError); // the withdraw is considered failed
        }
        return return_obj;
        // if(this.logout().ret)                                               // if the logout succedes
        //     return return_obj;                                              // the withdraw takes the value of the op_facade.withdraw
        // else
        //     return this.logout();                                           // the withdraw is considered failed
    };
    return Operator;
}());
exports.Operator = Operator;
