import { Printer } from "../Printer/Printer";
import { ResourceControl } from "../ResourceControl/ResourceControl";
import { Dealer } from "../Dealer/Dealer";
import { SafeBox } from "../SafeBox/SafeBox";
import { ReturnObj } from "../Operator/ReturnObj";
import { Errors } from "../../../config/errors";
import { BillBox } from "../BillBox/BillBox";
import { IOperationsFacade } from "./IOperationsFacade";
import { FilePrinter } from "../Printer/FilePrinter";

export class OperationsFacade implements IOperationsFacade {
    private printer : Printer = null;
    private res_control : ResourceControl = null;
    private dealer : Dealer = null;
    private safe_box : SafeBox = null;
    
    constructor(printer : Printer, res_control : ResourceControl, dealer : Dealer, safe_box : SafeBox) {    // the facade is instantiated with the already existing components, linking them together
        this.printer = printer;
        this.res_control = res_control;
        this.dealer = dealer;
        this.safe_box = safe_box;
    }
    
    public printAccSold(sold : number) : ReturnObj {                                                        // printing the account sold
        try{
            if(this.printer instanceof FilePrinter) {                                                       // if the printer is of type File
                if((<FilePrinter>this.printer).getPaperAmount() >= 1) {                                     // the paper amount must be checked
                    this.printer.printSold(sold);                                                           
                    return new ReturnObj(true,"Remaining sold is " + sold);
                }
                else {                                                                                      // if there is not enough paper
                    this.res_control.printerMaintenance();                                                  // the printer must be refilled                        
                    throw new Error(Errors.errorATMNeedsMaintenance);                                       // and an error is thrown
                }
            } 
            else {                                                                                          // if the printer is of type Console
                this.printer.printSold(sold);                                                               // the sold is directly printed
                return new ReturnObj(true,"Remaining sold is " + sold);
            }
        } catch(e) {
            return new ReturnObj(false,e.message);
        }
    }

    public withdraw(amount : number, need_receipt : boolean, sold : number) : ReturnObj {                   // withdraw an amount of money from the logged in account with specification of needing a receipt and current sold
        if(sold < amount)                                                                                   // the requested amount must be less than the current sold
            return new ReturnObj(false, Errors.errorNotEnoghMoneyInSold);
        
        let handled : String;

        try{
            handled = this.dealer.handleSum(amount);
        } catch(e) {
            return new ReturnObj(false,e.message);
        }          
        
        if(!handled){                                                                                       // if the handle request couldn't find a configuration of bills 
            try{
                this.billBoxesCheck();                                                                      // the billboxes are checked for refilling
                throw new Error(Errors.errorATMNeedsMaintenance);                                           // and an error is thrown
            } catch (e) {
                return new ReturnObj(false,e.message);
            }
        }

        if(!this.checkMoneyInSafeBox(amount)){                                                              // the amount that got in the safebox should match the one asked for
            return new ReturnObj(false,Errors.errorInternalError);
        }

        if(need_receipt){                                                                                   // if a receipt needed
            sold -= amount;

            if(this.printer instanceof FilePrinter) {                                                       // if the printer is of type File
                if((<FilePrinter>this.printer).getPaperAmount() >= 2) {                                     // the paper amount must be checked
                    this.printer.printReceipt(amount, sold);
                }
                else {                                                                                      // if there is not enough paper
                    this.res_control.printerMaintenance();                                                  // the printer must be refilled  
                    throw new Error(Errors.errorATMNeedsMaintenance);                                       // and an error is thrown
                }
            } 
            else {                                                                                          // if the printer is of type Console
                this.printer.printReceipt(amount, sold);                                                    // the receipt is directly printed
            }
        }

        if(this.safe_box.unlockSafeBox() && this.safe_box.lockSafeBox()) {                                  // if the safebox manages to unlock and lock back
            return new ReturnObj(true,handled);                                                                  // then the withdraw is successful
        }
        else 
            return new ReturnObj(false,Errors.errorStuckSafeBox);                                           // otherwise the withdraw is unsuccessful
    }

    private checkMoneyInSafeBox(amount : number) : boolean {                                                // checking if the sum send by the billboxes matches the one asked
        return (this.safe_box.getMoneyInSafeBox() == amount);
    }

    private billBoxesCheck() : void {                                                                       // check which the billboxes need maintenance
        let bill_boxes_to_fill : BillBox[] = this.dealer.billBoxesCheck();                                  // the dealer decides which billboxes need maintenance

        for(let i = 0 ; i < bill_boxes_to_fill.length ; ++i)
            this.res_control.billBoxMaintenance(bill_boxes_to_fill[i]);
    }
}