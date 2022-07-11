import { Account } from "../DataBase/Account";
import { Errors } from "../../../config/errors";
import { Client } from "../DataBase/AccDBClient";
import { ReturnObj } from "../Operator/ReturnObj";
import { AccDBProxy } from "../DataBase/AccDBProxy";

export class AccAuthSyst{
    private accDB_proxy : AccDBProxy;

    constructor(db_config : string){
        this.accDB_proxy = Client.getAccDBProxy(db_config);                 // the proxy is returned by the client, based on the DataBase config
    }

    public getAccSold() : number {                                          // requesting the sold of the crt session account
        if(this.accDB_proxy.hasActiveSession())                             // you can't get the current sold if there is no session account      
            return this.accDB_proxy.getAccSold();                           // the current session account sold is received from the proxy and returned
        else
            return null;                                                    // for getAccSold request without an account logged in the returned value is null
    }
    
    public login(card_num : string, card_pin : number) : ReturnObj {        // logging in, by validating the data and setting the current session
        if(!this.hasActiveSession()){                                       // another login operation can't be done while having an active session
            try{
                let data : Account = this.authenticate(card_num, card_pin); // returns an Account only if the data validating passed
                this.accDB_proxy.setSession(data);                          // setting the current session with the account returned
                return new ReturnObj(true, "");                             // login succeded, both authentication and setSession
            } catch(e) {
                return new ReturnObj(false, e.message);                     // if anything went wrong (bad card_num or card_pin or failed session setting), the error is catched
            }
        }
        else{
            return new ReturnObj(false,Errors.errorAnotherAccLoggedIn);     // if there is another account logged in the login fails
        }
    }

    public logout() : ReturnObj {                                           // removing the active session from the proxy
        if(this.accDB_proxy.hasActiveSession()){                            // a logout operation can't be done while not being logged in
            try{
                this.accDB_proxy.logout();                                  // the proxy is responsible for logging out and deleting the session account
                return new ReturnObj(true, "");                             // logout succesfully
            } catch(e) {
                return new ReturnObj(false,e.message);                      // something went wrong and is catched and returned
            }
        }
        else{
            return new ReturnObj(false,Errors.errorNoSessionLogout);        // the logout fails if there is no account logged in  
        }       
    }
    
    public updateAccSold(withdrawn_amount : number) : boolean {             // updating the account sold with an withdrawn_amount given
        if(withdrawn_amount < 0) return false;                                          // a positive withdrawn amount is required for the update

        let card_num = this.accDB_proxy.getSessionAcc().getProfile().getCardNumber();   // the card number is extracted form the session account
        let new_sold = this.accDB_proxy.getAccSold() - withdrawn_amount;                // the new sold is obtained from subtracting the withdrawn amount from the sold of the session account

        return this.accDB_proxy.updateAccSold(card_num, new_sold);                      // the update is sent further to the proxy
    }

    public hasActiveSession() : boolean {                                   // checking if the proxy is in a state of active session
        return this.accDB_proxy.hasActiveSession();                         // the proxy is the one that holds the currnet session state
    }

    private authenticate(card_num : string, card_pin : number) : Account {  // validating the data from search in DB with the given credentials
        let acc : Account = this.accDB_proxy.extractAcc(card_num);          // the proxy returns an account for the given card_num or null if there is no match

        if(acc != null){                                                    // an account must be found in order to continue with pin checking
            if(acc.getProfile().getCardPin() == card_pin)                   // the pin must also match in order to return the account found
                return acc;                                                 // if everything mathces the found account is returned
            else{
                throw new Error(Errors.errorWrongPin);                      // the pin of the request doesn't match the one of the found account
            }
        }
        else{
            throw new Error(Errors.errorAccNotFound);                       // there is no account with the given card number
        }
    }
}