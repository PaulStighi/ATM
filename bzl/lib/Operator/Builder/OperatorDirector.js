"use strict";
exports.__esModule = true;
var OperatorBuilder_1 = require("./OperatorBuilder");
var AccAuthSyst_1 = require("../../Authenticator/AccAuthSyst");
var BillBox_1 = require("../../BillBox/BillBox");
var Dealer_1 = require("../../Dealer/Dealer");
var ResourceControl_1 = require("../../ResourceControl/ResourceControl");
var OperationsFacade_1 = require("../OperationsFacade");
var SafeBox_1 = require("../../SafeBox/SafeBox");
var ConsolePrinter_1 = require("../../Printer/ConsolePrinter");
var FilePrinter_1 = require("../../Printer/FilePrinter");
var DescAscClient_1 = require("../../Dealer/DescAscClient");
var OperatorDirector = /** @class */ (function () {
    function OperatorDirector() {
        this.operator_builder = new OperatorBuilder_1.OperatorBuilder();
    }
    OperatorDirector.prototype.buildOperator = function (operator_config) {
        var fs = require('fs');
        var data = JSON.parse(fs.readFileSync(operator_config, 'utf8'));
        var bill_boxes = [];
        for (var i = 0; i < data.bill_boxes.length; ++i) { // the billboxes are being created with bills number and bill value
            var element = new BillBox_1.BillBox(+data.bill_boxes[i].bills_number, +data.bill_boxes[i].bill_value);
            bill_boxes.push(element); // the billboxes are added to an array
        }
        var dealer;
        if (data.strategy_client === "DescAsc") { // the dealer is created with the 2 strategies: Descending and Acending
            dealer = new Dealer_1.Dealer(bill_boxes, new DescAscClient_1.DescAscClient());
        }
        var printer;
        if (data.printer === "Console") { // the printer is created with either ConsolePrinter type
            printer = new ConsolePrinter_1.ConsolePrinter();
        }
        else { // or with FilePrinter type
            fs.writeFile(data.output, "", function (err) {
                if (err)
                    throw err;
            });
            printer = new FilePrinter_1.FilePrinter(data.output, data.paper_amount);
        }
        var res_control = new ResourceControl_1.ResourceControl(printer); // the resource control is created and linked with the printer
        var authenticator = new AccAuthSyst_1.AccAuthSyst(data.db_config); // the authenticator is created respecting the database config file
        this.operator_builder.withAuthenticator(authenticator); // the authenticator is added to the operator
        var op_facade = new OperationsFacade_1.OperationsFacade(printer, res_control, dealer, SafeBox_1.SafeBox.getInstance()); // the operations facade is created and linked with all the other elements        
        this.operator_builder.withOpFacade(op_facade); // the operations facade is added to the operator
        return this.operator_builder.build();
    };
    return OperatorDirector;
}());
exports.OperatorDirector = OperatorDirector;
