import { Strategy } from "./Strategy";
var _ = require('lodash');

export class AscendingStrategy implements Strategy {
    public name : string = "AscendingStrategy";

    public chooseDistribution(current_bills : Map<number,number>, amount : number) : Map<number,number> {   // selecting a distribution of bills from the available bills in bill boxes using the ascending strategy
        let keys = Array.from(current_bills.keys());                                                                            // the keys of the map are extracted
        keys = _.orderBy(keys, [ function(o){ return o; } ], ['asc']);                                                          // and sorted in ascneding order
        
        let chosen_bills = new Map();

        for(let key of keys) {                                                                                                  // for every key
            if(current_bills.get(key) <= Math.ceil(amount / key)){                                                              // if there are not enough bills in this bill value billbox
                chosen_bills.set(key,current_bills.get(key));                                                                   // all the bills are selected
            }
            else{
                chosen_bills.set(key,Math.ceil(amount / key));                                                                  // otherwise just the needed bills are selected
            }

            amount -= chosen_bills.get(key) * key;                                                                              // the amount to cover is updated
        }

        if(amount < 0) {                                                                                                        // if the distribution overcomes the amount
            for(let i = 0 ; i < keys.length && amount < 0 ; ++i) {                                                              // in the same order of keys
                if(amount / keys[i] === Math.ceil(amount / keys[i]) && (amount / keys[i]) * (-1) < chosen_bills.get(keys[i])) { // the exces of bills is eliminated form the distribution
                    chosen_bills.set(keys[i], chosen_bills.get(keys[i]) - (amount / keys[i]) * (-1));                           // and just the billvalue is mapped just with the needed bills
                    amount -= (amount / keys[i]) * (-1);                                                                        // the amount is updated with the new configuration
                }
            }
        }

        return chosen_bills;                                                                                                    // the distribution is returned
    }
}