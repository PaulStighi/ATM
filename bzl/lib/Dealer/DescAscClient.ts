import { BillBox } from "../BillBox/BillBox";
import { ArrayIterator } from "../BillBox/ArrayIterator";
import { Strategy } from "./Strategy/Strategy";
import { StrategyClient } from "./StrategyClient";
var _ = require('lodash');

export class DescAscClient extends StrategyClient {
    public chooseStrategy(bill_boxes : ArrayIterator<BillBox>) : Strategy {                         // choosing a strategy considering the filling percents of the billboxes
        let fill_percents : Map<number,number> = new Map<number,number>();
        
        bill_boxes.rewind();                                                                        // the billboxes iterator must be reinitialised
        process.stdout.write("\nRamaining bills : ");

        while(bill_boxes.valid()){                                                                  // the loop continues up untill there is no billbox lef to be iterated
            let current : BillBox = bill_boxes.next();                                              // the current billbox is requested from the iterator
            process.stdout.write(current.getBillValue() + " => " + current.getNumOfBills() + " ");
            fill_percents.set(current.getBillValue(),current.getFillPercent());                     // the filling percents is mapped with the bill values
        }

        let keys = Array.from(fill_percents.keys());                                                // the keys of the map are extracted (bill values)
        keys = _.orderBy(keys, [ function(o){ return o; } ], ['desc']);                             // the keys are sorted in ascending order

        process.stdout.write("\nFill Percents : ");

        for(let key of keys) {
            process.stdout.write(key + " => " + fill_percents.get(key) * 100 + "% ");
        }

        let type : string;

        if(fill_percents.get(keys[keys.length - 1]) <= fill_percents.get(keys[0]) + 0.2) {          // if the filling percents of billbox with the smallest bill value is with more than 20% less then the bigest bill value
            type = "desc";                                                                          // then the needed strategy is descending
        }
        else {
            type = "asc";                                                                           // otherwise the needed strategy is ascending
        }

        return this.strategies.get(type)                                                            // the strategy is returned after being selected from the map
    }
}