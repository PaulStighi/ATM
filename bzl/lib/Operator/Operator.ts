import { IOperationsFacade } from "./IOperationsFacade";
import { ReturnObj } from "./ReturnObj";
import { Errors } from "../../../config/errors";
import { AccAuthSyst } from "../Authenticator/AccAuthSyst";

export class Operator {
    private authenticator : AccAuthSyst = null;
    private op_facade : IOperationsFacade = null;
    
    public setAuthenticator(authenticator : AccAuthSyst) : void {
        this.authenticator = authenticator;
    }

    public setOpFacade(op_facade : IOperationsFacade) : void {
        this.op_facade = op_facade;
    }

    public login(card_number : string, card_pin : number) : ReturnObj {     // logging in the user with the card number and pin
        return this.authenticator.login(card_number, card_pin);
    }
    
    public logout() : ReturnObj {                                           // logging out of the current session
        return this.authenticator.logout();
    }
    
    public printAccSold() : ReturnObj {                                     // printing the account sold while being logged in
        if(this.authenticator.hasActiveSession()){                          // the sold can't be printed without an active session
            let sold = this.authenticator.getAccSold() 
            
            return this.op_facade.printAccSold(sold);
        }
        else{
            return new ReturnObj(false,Errors.errorNotLoggedIn);
        }
    }

    public withdraw(amount : number, need_receipt : boolean) : ReturnObj {  // withdraw an amount of money from the logged in account with specification of needing a receipt
        if(!this.authenticator.hasActiveSession()){                         // a withdraw operation can't be done without an active session
            return new ReturnObj(false,Errors.errorNotLoggedIn);
        }

        if(amount > this.authenticator.getAccSold()){                       // the asked sum should be less then the account sold
            return new ReturnObj(false,Errors.errorNotEnoghMoneyInSold);
        }

        let return_obj = this.op_facade.withdraw(amount,need_receipt,this.authenticator.getAccSold());

        if(return_obj.ret){                                                 // if the withdraw was successful
            if(!this.authenticator.updateAccSold(amount))                   // if the account sold update fails
                return new ReturnObj(false,Errors.errorInternalError);      // the withdraw is considered failed
        }

        return return_obj;

        // if(this.logout().ret)                                               // if the logout succedes
        //     return return_obj;                                              // the withdraw takes the value of the op_facade.withdraw
        // else
        //     return this.logout();                                           // the withdraw is considered failed
    }
}