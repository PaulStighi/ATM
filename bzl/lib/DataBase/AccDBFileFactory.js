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
var AccDBFactory_1 = require("./AccDBFactory");
var AccDBFile_1 = require("./AccDBFile");
var AccDBFileFactory = /** @class */ (function (_super) {
    __extends(AccDBFileFactory, _super);
    function AccDBFileFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccDBFileFactory.prototype.getAccDB = function (db_config) {
        return new AccDBFile_1.AccDBFile(db_config);
    };
    return AccDBFileFactory;
}(AccDBFactory_1.AccDBFactory));
exports.AccDBFileFactory = AccDBFileFactory;
