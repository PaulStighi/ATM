"use strict";
exports.__esModule = true;
var Account_1 = require("./Account");
var Profile_1 = require("../DataBase/Profile");
var _ = require('lodash');
var AccDBFile = /** @class */ (function () {
    function AccDBFile(db_config) {
        this.acc_db = [];
        try {
            var fs = require('fs');
            var path = fs.readFileSync(db_config, 'utf8');
            var data = fs.readFileSync(JSON.parse(path).db_path, 'utf8');
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.accounts.length; ++i) {
                var element = new Account_1.Account(new Profile_1.Profile(obj.accounts[i].card_number, +obj.accounts[i].card_pin, obj.accounts[i].email, obj.accounts[i].phone_number), +obj.accounts[i].sold);
                this.acc_db.push(element);
            }
        }
        catch (e) {
            throw e;
        }
    }
    AccDBFile.prototype.extractAcc = function (card_number) {
        var index = this.getAccIndex(card_number); // the index of the account with the given card_number is searched for
        if (index != -1) { // if there is a valid index found
            return this.acc_db[index]; // the account with that index is returned from the database
        }
        else
            return null; // if there is no match, an empty instance is returned
    };
    AccDBFile.prototype.updateAccSold = function (card_number, new_sold) {
        var index = this.getAccIndex(card_number); // the index of the account with the given card_number is searched for
        if (index != -1) { // if there is a valid index found
            this.acc_db[index].setCrtSold(new_sold); // the account with that index is updated with the new sold
            return true; // and the update is considered succeded
        }
        else
            return false; // if there is no match, the update fails
    };
    AccDBFile.prototype.getAccIndex = function (card_number) {
        var index = _.findIndex(this.acc_db, function (o) {
            return (o.getProfile().getCardNumber() == card_number); // compare function
        });
        return index; // if there is a match, a positive index is returned, otherwise it returns -1
    };
    return AccDBFile;
}());
exports.AccDBFile = AccDBFile;
