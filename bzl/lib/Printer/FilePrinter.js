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
var FancyPrinter_1 = require("./FancyPrinter");
var FilePrinter = /** @class */ (function (_super) {
    __extends(FilePrinter, _super);
    function FilePrinter(path, paper_amount) {
        var _this = _super.call(this) || this;
        _this.path = path;
        _this.paper_amount = paper_amount;
        _this.max_amount = paper_amount;
        return _this;
    }
    FilePrinter.prototype.printText = function (text) {
        try {
            var fs = require('fs');
            fs.appendFile(this.path, text + "\n", function (err) {
                if (err)
                    throw err;
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    };
    FilePrinter.prototype.getPaperAmount = function () {
        return this.paper_amount;
    };
    FilePrinter.prototype.refillPaper = function () {
        try {
            this.paper_amount = this.max_amount;
        }
        catch (error) {
            throw error;
        }
    };
    return FilePrinter;
}(FancyPrinter_1.FancyPrinter));
exports.FilePrinter = FilePrinter;
