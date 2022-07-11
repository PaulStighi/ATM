"use strict";
exports.__esModule = true;
var Account = /** @class */ (function () {
    function Account(profile, crt_sold) {
        this.profile = profile;
        this.crt_sold = crt_sold;
    }
    Account.prototype.getProfile = function () {
        return this.profile;
    };
    Account.prototype.getCrtSold = function () {
        return this.crt_sold;
    };
    Account.prototype.setCrtSold = function (new_sold) {
        this.crt_sold = new_sold;
    };
    return Account;
}());
exports.Account = Account;
