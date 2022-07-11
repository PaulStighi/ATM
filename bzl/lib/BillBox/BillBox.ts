import { SafeBox } from "../SafeBox/SafeBox";
import { Errors } from "../../../config/errors";
import { BillBoxMemento } from "./BillBoxMemento";
import { Observer } from "./Observer";

export class BillBox implements Observer{
    private num_of_bills : number;
    private max_num : number;
    private reserved_bills : number = 0;
    private bill_value : number;
    private safe_box : SafeBox;

    constructor(num_of_bills : number, bill_value : number){
        if(bill_value > 0 && !(bill_value % 10)){
            this.num_of_bills = num_of_bills;
            this.max_num = num_of_bills;
            this.bill_value = bill_value;
            this.safe_box = SafeBox.getInstance();
            this.safe_box.attachObserver(this);
        }
        else
            throw new Error("BillBox - constructor : " + Errors.errorBadParameter);
    }

    public getNumOfBills() : number {
        return this.num_of_bills;
    }

    public getBillValue() : number {
        return this.bill_value;
    }

    public getFillPercent() : number {
        return this.num_of_bills / this.max_num;
    }

    public getMaxNum() : number { 
        return this.max_num;
    }

    public updateNumOfBills(number_to_add : number) : void {                    // updating the number of bills of this billbox (negative param for withdraw)
        if((number_to_add * (-1)) <= this.num_of_bills){                        // for a negative amount, the module still needs to be less than the current number of bills
            this.num_of_bills += number_to_add;                                 // the given parameter is added to the current number of bills, for a negative param that means a substraction
        }
        else{
            throw new Error("BillBox - update : " + Errors.errorBadParameter);  // if the parameter is not respecting the requirements an error is thrown
        }
    }

    public sendBills(how_many : number) : void {                                // sending bills from this billbox to the safebox
        if(how_many > 0 && how_many <= this.num_of_bills){                      // the number of bills to send should be positive and less than the current number of bills
            this.safe_box.addMoneyInSafeBox(how_many * this.bill_value);        // the amount consisting of the value of all the sent bills is given to the safebox
            this.reserved_bills = how_many * (-1);                              // the bills used for sending are reserved for a later update of the number of bills
        }
        else
            throw new Error("BillBox - send : " + Errors.errorBadParameter);    // if the parameter is not respecting the requirements an error is thrown 
    }

    public update() : void {                                                    // as an observer the billbox must react to the notify it get's from the subject
        this.updateNumOfBills(this.reserved_bills); // the reserved bills are now substracted from the number of bills
        this.reserved_bills = 0;                    // a reset of the reserved bills must be done
    }

    /* 
    public save() : BillBoxMemento {                    // creates a snapshot of this billbox current state
        return new BillBoxMemento(this.num_of_bills);
    }

    
    public restore(memento : BillBoxMemento) {          // restores the state given as a parameter
        this.num_of_bills = memento.getNumOfBills();
    }
    */
}