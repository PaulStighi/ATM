"use strict";
exports.__esModule = true;
var AccDBFileFactory_1 = require("./AccDBFileFactory");
var AccDBDumbFactory_1 = require("./AccDBDumbFactory");
var AccDBProxy_1 = require("./AccDBProxy");
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.getAccDBProxy = function (db_config) {
        return new AccDBProxy_1.AccDBProxy(this.choose_source(db_config).getAccDB(db_config)); // creating the proxy with the database inside based on the db_config
    };
    Client.choose_source = function (db_config) {
        var fs = require('fs'); // for parsing the config file the file system module is required
        var obj = JSON.parse(fs.readFileSync(db_config, 'utf8')); // the file is parsed and the data kept in a new object
        var factory;
        if (obj.input_source === "FILE") // if the input source specified in the config file is "FILE"
            factory = new AccDBFileFactory_1.AccDBFileFactory(); // a database file facotry is returned
        if (obj.input_source === "DUMB") // if the input source specified in the config file is "DUMB"
            factory = new AccDBDumbFactory_1.AccDBDumbFactory(); // a database dumb facotry is returned
        return factory;
    };
    return Client;
}());
exports.Client = Client;
