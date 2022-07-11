import { Strategy } from "./Strategy";
var _ = require('lodash');

export class DescendingStrategy implements Strategy {
    public name : string = "DescendingStrategy";

    public chooseDistribution(current_bills : Map<number,number>, amount : number) : Map<number,number> {   // selecting a distribution of bills from the available bills in bill boxes using the descending strategy
        let keys = Array.from(current_bills.keys());                                                        // the keys of the map are extracted
        keys = _.orderBy(keys, [ function(o){ return o; } ], ['desc']);                                     // and sorted in descendibg order
        
        let chosen_bills = new Map();

        for(let key of keys) {                                                                              // for every key
            if(current_bills.get(key) <= Math.floor(amount / key)){                                         // if there are not enough bills in this bill value billbox
                chosen_bills.set(key,current_bills.get(key));                                               // all the bills are selected
            }
            else{
                chosen_bills.set(key,Math.floor(amount / key));                                             // otherwise just the needed bills are selected
            }

            amount -= chosen_bills.get(key) * key;                                                          // the amount to cover is updated
        }

        return chosen_bills;                                                                                // the distribution is returned
    }
}