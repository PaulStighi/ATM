"use strict";
exports.__esModule = true;
var errors_1 = require("../../../config/errors");
var AccDBClient_1 = require("../DataBase/AccDBClient");
var ReturnObj_1 = require("../Operator/ReturnObj");
var AccAuthSyst = /** @class */ (function () {
    function AccAuthSyst(db_config) {
        this.accDB_proxy = AccDBClient_1.Client.getAccDBProxy(db_config); // the proxy is returned by the client, based on the DataBase config
    }
    AccAuthSyst.prototype.getAccSold = function () {
        if (this.accDB_proxy.hasActiveSession()) // you can't get the current sold if there is no session account      
            return this.accDB_proxy.getAccSold(); // the current session account sold is received from the proxy and returned
        else
            return null; // for getAccSold request without an account logged in the returned value is null
    };
    AccAuthSyst.prototype.login = function (card_num, card_pin) {
        if (!this.hasActiveSession()) { // another login operation can't be done while having an active session
            try {
                var data = this.authenticate(card_num, card_pin); // returns an Account only if the data validating passed
                this.accDB_proxy.setSession(data); // setting the current session with the account returned
                return new ReturnObj_1.ReturnObj(true, ""); // login succeded, both authentication and setSession
            }
            catch (e) {
                return new ReturnObj_1.ReturnObj(false, e.message); // if anything went wrong (bad card_num or card_pin or failed session setting), the error is catched
            }
        }
        else {
            return new ReturnObj_1.ReturnObj(false, errors_1.Errors.errorAnotherAccLoggedIn); // if there is another account logged in the login fails
        }
    };
    AccAuthSyst.prototype.logout = function () {
        if (this.accDB_proxy.hasActiveSession()) { // a logout operation can't be done while not being logged in
            try {
                this.accDB_proxy.logout(); // the proxy is responsible for logging out and deleting the session account
                return new ReturnObj_1.ReturnObj(true, ""); // logout succesfully
            }
            catch (e) {
                return new ReturnObj_1.ReturnObj(false, e.message); // something went wrong and is catched and returned
            }
        }
        else {
            return new ReturnObj_1.ReturnObj(false, errors_1.Errors.errorNoSessionLogout); // the logout fails if there is no account logged in  
        }
    };
    AccAuthSyst.prototype.updateAccSold = function (withdrawn_amount) {
        if (withdrawn_amount < 0)
            return false; // a positive withdrawn amount is required for the update
        var card_num = this.accDB_proxy.getSessionAcc().getProfile().getCardNumber(); // the card number is extracted form the session account
        var new_sold = this.accDB_proxy.getAccSold() - withdrawn_amount; // the new sold is obtained from subtracting the withdrawn amount from the sold of the session account
        return this.accDB_proxy.updateAccSold(card_num, new_sold); // the update is sent further to the proxy
    };
    AccAuthSyst.prototype.hasActiveSession = function () {
        return this.accDB_proxy.hasActiveSession(); // the proxy is the one that holds the currnet session state
    };
    AccAuthSyst.prototype.authenticate = function (card_num, card_pin) {
        var acc = this.accDB_proxy.extractAcc(card_num); // the proxy returns an account for the given card_num or null if there is no match
        if (acc != null) { // an account must be found in order to continue with pin checking
            if (acc.getProfile().getCardPin() == card_pin) // the pin must also match in order to return the account found
                return acc; // if everything mathces the found account is returned
            else {
                throw new Error(errors_1.Errors.errorWrongPin); // the pin of the request doesn't match the one of the found account
            }
        }
        else {
            throw new Error(errors_1.Errors.errorAccNotFound); // there is no account with the given card number
        }
    };
    return AccAuthSyst;
}());
exports.AccAuthSyst = AccAuthSyst;
