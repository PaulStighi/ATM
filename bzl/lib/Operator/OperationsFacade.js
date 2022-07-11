"use strict";
exports.__esModule = true;
var ReturnObj_1 = require("../Operator/ReturnObj");
var errors_1 = require("../../../config/errors");
var FilePrinter_1 = require("../Printer/FilePrinter");
var OperationsFacade = /** @class */ (function () {
    function OperationsFacade(printer, res_control, dealer, safe_box) {
        this.printer = null;
        this.res_control = null;
        this.dealer = null;
        this.safe_box = null;
        this.printer = printer;
        this.res_control = res_control;
        this.dealer = dealer;
        this.safe_box = safe_box;
    }
    OperationsFacade.prototype.printAccSold = function (sold) {
        try {
            if (this.printer instanceof FilePrinter_1.FilePrinter) { // if the printer is of type File
                if (this.printer.getPaperAmount() >= 1) { // the paper amount must be checked
                    this.printer.printSold(sold);
                    return new ReturnObj_1.ReturnObj(true, "Remaining sold is " + sold);
                }
                else { // if there is not enough paper
                    this.res_control.printerMaintenance(); // the printer must be refilled                        
                    throw new Error(errors_1.Errors.errorATMNeedsMaintenance); // and an error is thrown
                }
            }
            else { // if the printer is of type Console
                this.printer.printSold(sold); // the sold is directly printed
                return new ReturnObj_1.ReturnObj(true, "Remaining sold is " + sold);
            }
        }
        catch (e) {
            return new ReturnObj_1.ReturnObj(false, e.message);
        }
    };
    OperationsFacade.prototype.withdraw = function (amount, need_receipt, sold) {
        if (sold < amount) // the requested amount must be less than the current sold
            return new ReturnObj_1.ReturnObj(false, errors_1.Errors.errorNotEnoghMoneyInSold);
        var handled;
        try {
            handled = this.dealer.handleSum(amount);
        }
        catch (e) {
            return new ReturnObj_1.ReturnObj(false, e.message);
        }
        if (!handled) { // if the handle request couldn't find a configuration of bills 
            try {
                this.billBoxesCheck(); // the billboxes are checked for refilling
                throw new Error(errors_1.Errors.errorATMNeedsMaintenance); // and an error is thrown
            }
            catch (e) {
                return new ReturnObj_1.ReturnObj(false, e.message);
            }
        }
        if (!this.checkMoneyInSafeBox(amount)) { // the amount that got in the safebox should match the one asked for
            return new ReturnObj_1.ReturnObj(false, errors_1.Errors.errorInternalError);
        }
        if (need_receipt) { // if a receipt needed
            sold -= amount;
            if (this.printer instanceof FilePrinter_1.FilePrinter) { // if the printer is of type File
                if (this.printer.getPaperAmount() >= 2) { // the paper amount must be checked
                    this.printer.printReceipt(amount, sold);
                }
                else { // if there is not enough paper
                    this.res_control.printerMaintenance(); // the printer must be refilled  
                    throw new Error(errors_1.Errors.errorATMNeedsMaintenance); // and an error is thrown
                }
            }
            else { // if the printer is of type Console
                this.printer.printReceipt(amount, sold); // the receipt is directly printed
            }
        }
        if (this.safe_box.unlockSafeBox() && this.safe_box.lockSafeBox()) { // if the safebox manages to unlock and lock back
            return new ReturnObj_1.ReturnObj(true, handled); // then the withdraw is successful
        }
        else
            return new ReturnObj_1.ReturnObj(false, errors_1.Errors.errorStuckSafeBox); // otherwise the withdraw is unsuccessful
    };
    OperationsFacade.prototype.checkMoneyInSafeBox = function (amount) {
        return (this.safe_box.getMoneyInSafeBox() == amount);
    };
    OperationsFacade.prototype.billBoxesCheck = function () {
        var bill_boxes_to_fill = this.dealer.billBoxesCheck(); // the dealer decides which billboxes need maintenance
        for (var i = 0; i < bill_boxes_to_fill.length; ++i)
            this.res_control.billBoxMaintenance(bill_boxes_to_fill[i]);
    };
    return OperationsFacade;
}());
exports.OperationsFacade = OperationsFacade;
