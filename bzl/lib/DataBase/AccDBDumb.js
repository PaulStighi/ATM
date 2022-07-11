"use strict";
exports.__esModule = true;
var Account_1 = require("./Account");
var Profile_1 = require("../DataBase/Profile");
var _ = require('lodash');
var AccDBDumb = /** @class */ (function () {
    function AccDBDumb() {
        this.acc_db = [];
        try {
            var obj = {
                "accounts": [
                    { "card_number": "2123 1212", "card_pin": "1234", "sold": "3700", "email": "a@a.com", "phone_number": "0" },
                    { "card_number": "3221 3173", "card_pin": "1234", "sold": "300", "email": "", "phone_number": "1" },
                    { "card_number": "4750 4891", "card_pin": "1234", "sold": "700", "email": "b@b.com", "phone_number": "" },
                    { "card_number": "7519 3147", "card_pin": "4317", "sold": "350", "email": "", "phone_number": "" },
                    { "card_number": "6478 1247", "card_pin": "3412", "sold": "620", "email": "", "phone_number": "" }
                ]
            };
            for (var i = 0; i < obj.accounts.length; ++i) {
                var element = new Account_1.Account(new Profile_1.Profile(obj.accounts[i].card_number, +obj.accounts[i].card_pin, obj.accounts[i].email, obj.accounts[i].phone_number), +obj.accounts[i].sold);
                this.acc_db.push(element);
            }
        }
        catch (e) {
            throw e;
        }
    }
    AccDBDumb.prototype.extractAcc = function (card_number) {
        var index = this.getAccIndex(card_number); // the index of the account with the given card_number is searched for
        if (index != -1) { // if there is a valid index found
            return this.acc_db[index]; // the account with that index is returned from the database
        }
        else
            return null; // if there is no match, an empty instance is returned
    };
    AccDBDumb.prototype.updateAccSold = function (card_number, new_sold) {
        var index = this.getAccIndex(card_number); // the index of the account with the given card_number is searched for
        if (index != -1) { // if there is a valid index found
            this.acc_db[index].setCrtSold(new_sold); // the account with that index is updated with the new sold
            return true; // and the update is considered succeded
        }
        else
            return false; // if there is no match, the update fails
    };
    AccDBDumb.prototype.getAccIndex = function (card_number) {
        var index = _.findIndex(this.acc_db, function (o) {
            return (o.getProfile().getCardNumber() == card_number); // compare function
        });
        return index; // if there is a match, a positive index is returned, otherwise it returns -1
    };
    return AccDBDumb;
}());
exports.AccDBDumb = AccDBDumb;
