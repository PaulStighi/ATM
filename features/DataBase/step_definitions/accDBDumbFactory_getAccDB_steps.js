const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var AccDBFDumbFactory = require("../../../bzl/lib/DataBase/AccDBDumbFactory").AccDBDumbFactory;
var AccDBDumb = require("../../../bzl/lib/DataBase/AccDBDumb").AccDBDumb;

var factory;
var db;

Given('AccDBDumbFactory : The AccDBDumbFactory was created', function () {
    factory = new AccDBFDumbFactory();
});

When('AccDBDumbFactory : The factory is asked to create a hard coded Account DB',function () {
    db = factory.getAccDB();
});

Then('AccDBDumbFactory : The type of the Account DB should be AccDBDumb', function () {
    assert.equal(db instanceof AccDBDumb, true);
});