import { Account } from "./Account";
import { Profile } from "../DataBase/Profile";
import { AccDB } from "./AccDB";
let _ = require('lodash');

export class AccDBDumb implements AccDB {
    private acc_db : Array<Account> = [];
    
    constructor(){                                                              // Accounts DataBase is hard coded inside the constructor
        try {
            let obj = {
                "accounts" :
                [
                    {"card_number" : "2123 1212", "card_pin" : "1234", "sold" : "3700", "email" : "a@a.com", "phone_number" : "0"},
                    {"card_number" : "3221 3173", "card_pin" : "1234", "sold" : "300" , "email" : ""       , "phone_number" : "1"},
                    {"card_number" : "4750 4891", "card_pin" : "1234", "sold" : "700" , "email" : "b@b.com", "phone_number" : "" },
                    {"card_number" : "7519 3147", "card_pin" : "4317", "sold" : "350" , "email" : ""       , "phone_number" : "" },
                    {"card_number" : "6478 1247", "card_pin" : "3412", "sold" : "620" , "email" : ""       , "phone_number" : "" }
                ]
            };
            
            for(let i = 0 ; i < obj.accounts.length ; ++i){
                let element : Account = new Account(new Profile(obj.accounts[i].card_number,
                                                               +obj.accounts[i].card_pin,
                                                                obj.accounts[i].email,
                                                                obj.accounts[i].phone_number), 
                                                               +obj.accounts[i].sold);
                this.acc_db.push(element);            
            }
        } catch(e) {
            throw e;
        }
    }

    public extractAcc(card_number : string) : Account {                         // searching for the account with the given card_number in the DB
        let index = this.getAccIndex(card_number);      // the index of the account with the given card_number is searched for

        if(index != -1){                                // if there is a valid index found
            return this.acc_db[index];                  // the account with that index is returned from the database
        }
        else
            return null;                                // if there is no match, an empty instance is returned
    }

    public updateAccSold(card_number : string, new_sold : number) : boolean {   // updating the sold of the account with given card_num in the DB
        let index = this.getAccIndex(card_number);                              // the index of the account with the given card_number is searched for
        
        if(index != -1){                                                        // if there is a valid index found
            this.acc_db[index].setCrtSold(new_sold);                            // the account with that index is updated with the new sold
            return true;                                                        // and the update is considered succeded
        }
        else
            return false;                                                       // if there is no match, the update fails
    }

    private getAccIndex(card_number : string) : number {                        // searching the index of an account from the database by it's card_number
        let index : number = _.findIndex(this.acc_db, function (o:Account) {
            return (o.getProfile().getCardNumber() == card_number);             // compare function
        });

        return index;                                                           // if there is a match, a positive index is returned, otherwise it returns -1
    }
}