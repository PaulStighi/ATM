const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var AccDBFFileFactory = require("../../../bzl/lib/DataBase/AccDBFileFactory").AccDBFileFactory;
var AccDBFile = require("../../../bzl/lib/DataBase/AccDBFile").AccDBFile;
var db_config = "C:\\Users\\Paul\\Desktop\\Coding\\ATM\\config\\DataBase\\db_config.json";
var factory;
var db;

Given('AccDBFileFactory : The AccDBFileFactory was created', function () {
    factory = new AccDBFFileFactory();
});

When('AccDBFileFactory : The factory is asked to create a file-source Account DB',function () {
    db = factory.getAccDB(db_config);
});

Then('AccDBFileFactory : The type of the Account DB should be AccDBFile', function () {
    assert.equal(db instanceof AccDBFile, true);
});