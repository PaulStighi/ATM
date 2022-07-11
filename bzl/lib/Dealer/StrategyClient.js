"use strict";
exports.__esModule = true;
var _ = require('lodash');
var StrategyClient = /** @class */ (function () {
    function StrategyClient() {
        this.strategies = require("../../../config/Strategy/strategy_config").strategies;
    }
    return StrategyClient;
}());
exports.StrategyClient = StrategyClient;
