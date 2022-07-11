"use strict";
exports.__esModule = true;
var Profile = /** @class */ (function () {
    function Profile(card_number, card_pin, email, phone_number) {
        this.card_number = card_number;
        this.card_pin = card_pin;
        this.email = email != "" ? email : null;
        this.phone_number = phone_number != "" ? phone_number : null;
    }
    Profile.prototype.getCardNumber = function () {
        return this.card_number;
    };
    Profile.prototype.getCardPin = function () {
        return this.card_pin;
    };
    Profile.prototype.getEmail = function () {
        return this.email;
    };
    Profile.prototype.getPhoneNumber = function () {
        return this.phone_number;
    };
    return Profile;
}());
exports.Profile = Profile;
