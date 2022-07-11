import {Operator} from "../lib/Operator/Operator";

export class OperatorAPI {
    private operatorLIB : Operator = null;

    constructor(op : Operator) {
        this.operatorLIB = op;
    }

    public login(card_number : string, card_pin : number) : String {
        let retVal = this.operatorLIB.login(card_number, card_pin);
        
        if(retVal.ret)
            return("Login successful");
        else
            return(retVal.message);
    }

    public printAccSold() : String {
        let retVal = this.operatorLIB.printAccSold();

        return(retVal.message);
    }

    public withdraw(amount : number, need_receipt : boolean) : String {
        let retVal = this.operatorLIB.withdraw(amount, need_receipt);
        
        if(retVal.ret)
            return("Withdraw successful<br>" + retVal.message);
        else
            return(retVal.message);
    }

    public logout() : String {
        let retVal = this.operatorLIB.logout();

        if(retVal.ret)
            return("Logout successful");
        else
            return(retVal.message);
    }
}