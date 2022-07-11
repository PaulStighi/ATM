"use strict";
exports.__esModule = true;
var ResourceControl = /** @class */ (function () {
    function ResourceControl(printer) {
        this.printer = printer;
    }
    ResourceControl.prototype.printerMaintenance = function () {
        this.printer.refillPaper();
    };
    ResourceControl.prototype.billBoxMaintenance = function (bill_box) {
        bill_box.updateNumOfBills(bill_box.getMaxNum() - bill_box.getNumOfBills());
    };
    return ResourceControl;
}());
exports.ResourceControl = ResourceControl;
