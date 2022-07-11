"use strict";
exports.__esModule = true;
var Printer = /** @class */ (function () {
    function Printer() {
    }
    Printer.prototype.printSold = function (sold) {
        var text = this.getText(sold); // getting the text for the request
        var format = this.getFormat(); // getting the format for the request
        return this.printText(text, format); // print the request with the two parameters
    };
    Printer.prototype.printReceipt = function (amount, sold) {
        var text = this.getText(sold, amount); // getting the text for the request
        var format = this.getFormat(amount); // getting the format for the request
        return this.printText(text, format); // print the request with the two parameters
    };
    Printer.prototype.getText = function (sold, amount) {
        if (amount) // if there is an amount parameter it means a withdraw text is needed
            return ("Withdraw: " + amount + " RON\n Remaining sold: " + sold + " RON");
        else // otherwise an account sold text is needed
            return ("Remaining sold is " + sold + " RON");
    };
    return Printer;
}());
exports.Printer = Printer;
