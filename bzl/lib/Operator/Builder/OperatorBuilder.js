"use strict";
exports.__esModule = true;
var Operator_1 = require("../Operator");
var OperatorBuilder = /** @class */ (function () {
    function OperatorBuilder() {
        this.operator = new Operator_1.Operator();
    }
    OperatorBuilder.prototype.withAuthenticator = function (authenticator) {
        this.operator.setAuthenticator(authenticator);
    };
    OperatorBuilder.prototype.withOpFacade = function (op_facade) {
        this.operator.setOpFacade(op_facade);
    };
    OperatorBuilder.prototype.build = function () {
        return this.operator;
    };
    return OperatorBuilder;
}());
exports.OperatorBuilder = OperatorBuilder;
