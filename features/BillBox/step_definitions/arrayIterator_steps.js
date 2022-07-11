const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var ArrayIterator = require("../../../bzl/lib/BillBox/ArrayIterator").ArrayIterator;
var iterator;

Given('ArrayIterator : The iterator type is {string}', function (string) {
    this.T = string;
});

Given('ArrayIterator : The array inside is {string}',function (string) {
    this.config = string.split(",");

    if(this.T === "number"){
        for(let i = 0 ; i < this.config.length ; ++i){
            this.config[i] = parseInt(this.config[i],10);
        }
    }
    else
        if(this.T === "bool"){
            for(let i = 0 ; i < this.config.length ; ++i){
                if(this.config[i] === "true")
                    this.config[i] = true;
                else
                    this.config[i] = false;
            }
        }

    iterator = new ArrayIterator(this.config);
});

When('ArrayIterator : The next function is called', function () {
    this.ret = iterator.next();
});

Then('ArrayIterator : The return of next should be {string}', function (string) {
    assert.equal(this.ret.toString(),string);
});

When('ArrayIterator : The valid function is called', function () {
    this.ret = iterator.valid(); 
});

Then('ArrayIterator : The return of valid should be {string}', function (string) {
    assert.equal(this.ret.toString(),string);
});

When('ArrayIterator : The getIndex function is called', function () {
    this.ret = iterator.getIndex(); 
});

Then('ArrayIterator : The return of getIndex should be {int}', function (int) {
    assert.equal(this.ret,int);
});

When('ArrayIterator : The rewind function is called', function () {
    iterator.rewind();
});

Then('ArrayIterator : The return of getIndex after rewind should be {int}', function (int) {
    assert.equal(iterator.getIndex(),int);
});
