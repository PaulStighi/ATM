"use strict";
exports.__esModule = true;
var AccDBProxy = /** @class */ (function () {
    function AccDBProxy(accDB) {
        this.session_account = null;
        this.active_session = false;
        this.accDB = accDB;
    }
    AccDBProxy.prototype.getSessionAcc = function () {
        return this.session_account;
    };
    AccDBProxy.prototype.getAccSold = function () {
        return this.session_account.getCrtSold();
    };
    AccDBProxy.prototype.extractAcc = function (card_number) {
        if (this.session_account && this.getSessionAcc().getProfile().getCardNumber() == card_number) { // if there is a cached session account and the same card number
            console.log("\n" + card_number + " : Using the cached session account");
            return this.session_account; // the cached session account is returned
        }
        else {
            return this.accDB.extractAcc(card_number); // otherwise, the duty is passed to the database to try to return that account if exists
        }
    };
    AccDBProxy.prototype.updateAccSold = function (card_number, new_sold) {
        this.session_account.setCrtSold(new_sold); // the session account should be also update in case of a future need of using the cached data for a login
        return this.accDB.updateAccSold(card_number, new_sold); // the sold of the account with the given card number is updated 
    };
    AccDBProxy.prototype.hasActiveSession = function () {
        return this.active_session;
    };
    AccDBProxy.prototype.setSession = function (acc) {
        this.session_account = acc;
        this.active_session = true;
    };
    AccDBProxy.prototype.logout = function () {
        this.active_session = false;
    };
    return AccDBProxy;
}());
exports.AccDBProxy = AccDBProxy;
