import { Account } from "./Account";
import { AccDB } from "./AccDB";

export class AccDBProxy implements AccDB{
    private accDB : AccDB;
    private session_account : Account = null;
    private active_session : boolean = false;

    constructor(accDB : AccDB){
        this.accDB = accDB;
    }

    public getSessionAcc() : Account {
            return this.session_account;
    }

    public getAccSold() : number {
        return this.session_account.getCrtSold();
    }

    public extractAcc(card_number : string) : Account {                         // get the account with specified card number from the cached session account or from the data base(if it exists)
        if(this.session_account && this.getSessionAcc().getProfile().getCardNumber()  == card_number){  // if there is a cached session account and the same card number
            console.log("\n" + card_number + " : Using the cached session account");
            return this.session_account;                                                                // the cached session account is returned
        }
        else{
            return this.accDB.extractAcc(card_number);                                                  // otherwise, the duty is passed to the database to try to return that account if exists
        }
    }
    
    public updateAccSold(card_number : string, new_sold : number) : boolean {   // update the account sold in the session account and in the data base
        this.session_account.setCrtSold(new_sold);                              // the session account should be also update in case of a future need of using the cached data for a login
        return this.accDB.updateAccSold(card_number, new_sold);                 // the sold of the account with the given card number is updated 
    }
    
    public hasActiveSession() : boolean {                                       // check if there is an active session (login operation done without a logout complement)
        return this.active_session;
    }

    public setSession(acc : Account) : void {                                   // assigning the session to active and the found account as session_account
        this.session_account = acc;
        this.active_session = true;
    }

    public logout() : void {                                                    // deleting the active session but caching the session account for the next login operation
        this.active_session = false;
    }
}