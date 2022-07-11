import { Account } from "./Account";
import { Profile } from "../DataBase/Profile";
import { AccDB } from "./AccDB";
let _ = require('lodash');

export class AccDBFile implements AccDB {
    private acc_db : Array<Account> = [];
    
    constructor(db_config : string){                                            // Accounts DataBase is imported from a local file
        try {
            let fs = require('fs');
            let path  = fs.readFileSync(db_config, 'utf8');
            let data = fs.readFileSync(JSON.parse(path).db_path, 'utf8');
            let obj = JSON.parse(data);
            
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