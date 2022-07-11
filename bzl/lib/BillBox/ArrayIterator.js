"use strict";
exports.__esModule = true;
var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(array) {
        this.index = 0;
        this.array = array;
    }
    ArrayIterator.prototype.rewind = function () {
        this.index = 0;
    };
    ArrayIterator.prototype.next = function () {
        return this.array[this.index++];
    };
    ArrayIterator.prototype.valid = function () {
        return (this.index < this.array.length);
    };
    ArrayIterator.prototype.getIndex = function () {
        return this.index;
    };
    ArrayIterator.prototype.item = function (index) {
        return this.array[index];
    };
    return ArrayIterator;
}());
exports.ArrayIterator = ArrayIterator;
