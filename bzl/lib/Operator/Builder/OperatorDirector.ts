import { OperatorBuilder } from "./OperatorBuilder";
import { AccAuthSyst } from "../../Authenticator/AccAuthSyst";
import { BillBox } from "../../BillBox/BillBox";
import { Dealer } from "../../Dealer/Dealer";
import { ResourceControl } from "../../ResourceControl/ResourceControl";
import { Operator } from "../Operator";
import { IOperatorBuilder } from "./IOperatorBuilder";
import { OperationsFacade } from "../OperationsFacade";
import { SafeBox } from "../../SafeBox/SafeBox";
import { ConsolePrinter } from "../../Printer/ConsolePrinter";
import { FilePrinter } from "../../Printer/FilePrinter";
import { DescAscClient } from "../../Dealer/DescAscClient";

export class OperatorDirector {
    private operator_builder : IOperatorBuilder;

    constructor() {
        this.operator_builder = new OperatorBuilder();
    }

    public buildOperator(operator_config : string) : Operator {                                 // the operator is built by the director respecting the operator config file
        let fs = require('fs');
        let data = JSON.parse(fs.readFileSync(operator_config, 'utf8'));
        let bill_boxes : BillBox[] = [];

        for(let i = 0 ; i < data.bill_boxes.length ; ++i){                                      // the billboxes are being created with bills number and bill value
            let element : BillBox = new BillBox(+data.bill_boxes[i].bills_number, 
                                                +data.bill_boxes[i].bill_value);
            bill_boxes.push(element);                                                           // the billboxes are added to an array
        }

        let dealer;
        
        if(data.strategy_client === "DescAsc") {                                                // the dealer is created with the 2 strategies: Descending and Acending
            dealer = new Dealer(bill_boxes, new DescAscClient());                                
        }
            
        let printer;

        if(data.printer === "Console") {                                                        // the printer is created with either ConsolePrinter type
            printer = new ConsolePrinter();
        }
        else {                                                                                  // or with FilePrinter type
            fs.writeFile(data.output, "", (err) => {                                            // then the output file must also be reseted
                if (err) throw err;
            });

            printer = new FilePrinter(data.output, data.paper_amount);
        }
            

        let res_control = new ResourceControl(printer);                                         // the resource control is created and linked with the printer

        let authenticator = new AccAuthSyst(data.db_config);                                    // the authenticator is created respecting the database config file
        this.operator_builder.withAuthenticator(authenticator);                                 // the authenticator is added to the operator

        let op_facade = new OperationsFacade(printer,res_control,dealer,SafeBox.getInstance()); // the operations facade is created and linked with all the other elements        
        this.operator_builder.withOpFacade(op_facade);                                          // the operations facade is added to the operator

        return this.operator_builder.build();
    }
}