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
var Printer_1 = require("./Printer");
var FormatObj_1 = require("./FormatObj");
var colors = require("../../../config/Printer/colors").colors;
var FancyPrinter = /** @class */ (function (_super) {
    __extends(FancyPrinter, _super);
    function FancyPrinter() {
        return _super.call(this) || this;
    }
    FancyPrinter.prototype.getFormat = function (amount) {
        if (amount) // if there is an amount parameter it means a withdraw format is needed
            return new FormatObj_1.FormatObj(colors.fg.Green, colors.bg.Black, colors.Reset);
        else // otherwise an account sold format is needed
            return new FormatObj_1.FormatObj(colors.fg.Blue, colors.bg.Black, colors.Reset);
    };
    return FancyPrinter;
}(Printer_1.Printer));
exports.FancyPrinter = FancyPrinter;
