import { BillBox } from "../BillBox/BillBox";
import { ArrayIterator } from "../BillBox/ArrayIterator";
import { StrategyClient } from "./StrategyClient";
import { ReturnObj } from "../Operator/ReturnObj";
/* import { CaretakerMemento } from "../BillBox/CaretakerMemento"; */
var _ = require('lodash');

export class Dealer{
    private bill_boxes : ArrayIterator<BillBox>;
    private client : StrategyClient;
    // private care_takers : ArrayIterator<CaretakerMemento>;

    constructor(bill_boxes : BillBox[], client : StrategyClient){
       /*  let care_takers : CaretakerMemento[] = [];

        for(let i = 0 ; i < bill_boxes.length ; ++i)
            care_takers[i] = new CaretakerMemento(bill_boxes[i]); */

        // this.care_takers = new ArrayIterator<CaretakerMemento>(care_takers);
        this.bill_boxes = new ArrayIterator<BillBox>(bill_boxes);
        this.client = client;
    }

    public handleSum(amount : number) : String {                                                   // trying to find a configuration of bills that can cover the asked sum using the ATM resources
        let current_bills : Map<number,number> = new Map<number,number>();                          // the current number of bills from each billbox must be consulted

        this.bill_boxes.rewind();                                                                   // the billboxes iterator must be reinitialised

        while(this.bill_boxes.valid()){                                                             // the loop continues up untill there is no billbox lef to be iterated
            let current : BillBox = this.bill_boxes.next();                         // the current billbox is requested from the iterator
            current_bills.set(current.getBillValue(),current.getNumOfBills());      // the current bills number of that billbox is mapped with the bill value
        }

        let strategy = this.client.chooseStrategy(this.bill_boxes);

        process.stdout.write("\n" + strategy.name + " - ");

        let chosen_bills = strategy.chooseDistribution(current_bills,amount);  // the selected strategy tries to choose a distribution of bills to cover the requested amount 
        let retVal = this.strategyOfDistribution(amount, chosen_bills);
        console.log(retVal.message);

        if(retVal.ret)                                       // if the distribution covers the requested amount, the handling is successful
            return retVal.message;
        else
            return null;
    }    

    public billBoxesCheck() : BillBox[]{                                                            // checking which billboxes need maintenance
        let bill_boxes_for_service : BillBox[] = [];

        this.bill_boxes.rewind();                           // the billboxes iterator must be reinitialised

        while(this.bill_boxes.valid()){                     // the loop continues up untill there is no billbox lef to be iterated
            let current : BillBox = this.bill_boxes.next(); // the current billbox is requested from the iterator

            if(current.getFillPercent() <= 0.2){            // if the fill percent of the current billbox is less than 20%
                bill_boxes_for_service.push(current);       // then the current billbox is set for maintenance
            }
        }

        return bill_boxes_for_service;
    }

    private strategyOfDistribution(amount: number, chosen_bills : Map<number,number>) : ReturnObj {   // verify if the distribution is valid and use it if so
        let res = "";
        res += (amount.toString() + " : ");
        process.stdout.write(amount.toString() + " : ");

        let keys = Array.from(chosen_bills.keys());                                                 // the keys of the map are extracted
        for(let key of keys) {                                                                      // for every key      
            amount -= chosen_bills.get(key) * key;                                                  // the value of the bills chosen with that bill_value is subtracted
            res += (key + " => " + chosen_bills.get(key) + " ");
            process.stdout.write(key + " => " + chosen_bills.get(key) + " ");
        }

        console.log();

        if(amount == 0){                                                                            // if the amount was fully covered
            this.bill_boxes.rewind();                                                               // the billboxes iterator must be reinitialised       
            // this.care_takers.rewind();

            while(this.bill_boxes.valid() /* && this.care_takers.valid() */){                       // the loop continues up untill there is no billbox lef to be iterated
                let currentb : BillBox = this.bill_boxes.next();                                    // the current billbox is requested from the iterator
                // let currentc : CaretakerMemento = this.care_takers.next();

                // currentc.backup();
                if(chosen_bills.get(currentb.getBillValue())) {                                     // if there are bills chosen for the current billbox
                    currentb.sendBills(chosen_bills.get(currentb.getBillValue()));                  // the current billbox sents the value of the chosen bills to the safebox and reserves that number of bills
                }
            }

            return new ReturnObj(true, res);                                                                            // the distribution was successful
        }
        else {
            console.log("failed\n");
            return new ReturnObj(false, "");                                                                           // if there is still amount not covered, then the distribution failed
        }    
    }
    
    /*
    // send the bills selected from a billbox to the safebox and update their number
    private updateBillBox(bill_box : BillBox, bills_to_send : number) : void {                      
        bill_box.sendBills(bills_to_send * (-1));
        //bill_box.updateNumOfBills(bills_to_send);
    }

    // the configuration selected previously is sent back to the billboxes because of an error at the safebox
    public sendBillsBack() : void {
        this.care_takers.rewind();

        while(this.care_takers.valid()){
            let current : CaretakerMemento = this.care_takers.next();
            current.undo();
        }
    } */

    /* private chooseStrategy() : Strategy {
        let fill_percents : Map<number,number> = new Map<number,number>();
        
        this.bill_boxes.rewind();
        process.stdout.write("\nRamaining bills : ");

        while(this.bill_boxes.valid()){
            let current : BillBox = this.bill_boxes.next();
            process.stdout.write(current.getBillValue() + " => " + current.getNumOfBills() + " ");
            fill_percents.set(current.getBillValue(),current.getFillPercent());
        }

        let keys = Array.from(fill_percents.keys());
        keys = _.orderBy(keys, [ function(o){ return o; } ], ['asc']);


        for(let i = 0 ; i < keys.length ; ++i) {
            // console.log("\n" + keys[i] + " " + fill_percents.get(keys[i]) + "\n" + keys[keys.length - i - 1] + " " + fill_percents.get(keys[keys.length - i - 1]));
            if(fill_percents.get(keys[i]) <= fill_percents.get(keys[keys.length - i - 1]) + 0.2)
                return new DescendingStrategy();
            else
                return new AscendingStrategy();
        }
    } 
    */
}