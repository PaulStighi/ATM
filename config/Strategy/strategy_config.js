"use strict";
exports.__esModule = true;
var AscendingStrategy_1 = require("../../bzl/lib/Dealer/Strategy/AscendingStrategy");
var DescendingStrategy_1 = require("../../bzl/lib/Dealer/Strategy/DescendingStrategy");
exports.strategies = new Map([
    ["asc", new AscendingStrategy_1.AscendingStrategy()],
    ["desc", new DescendingStrategy_1.DescendingStrategy()]
]);
