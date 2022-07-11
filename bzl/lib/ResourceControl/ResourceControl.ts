import { Printer } from "../Printer/Printer";
import { BillBox } from "../BillBox/BillBox";
import { FilePrinter } from "../Printer/FilePrinter";

export class ResourceControl{
    private printer : Printer;

    constructor(printer : Printer){
        this.printer = printer;
    }
    
    public printerMaintenance() : void {                    // offering maintenance to the printer
        (<FilePrinter>this.printer).refillPaper();
    }
    
    public billBoxMaintenance(bill_box : BillBox) : void {  // offering maintenance to a specific billbox
        bill_box.updateNumOfBills(bill_box.getMaxNum() - bill_box.getNumOfBills());
    }
}