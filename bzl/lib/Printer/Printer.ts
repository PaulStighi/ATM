import { FormatObj } from "./FormatObj";

export abstract class Printer{
    public printSold(sold : number) : boolean {                     // printing the current sold
        const text = this.getText(sold);                            // getting the text for the request
        const format = this.getFormat();                            // getting the format for the request

        return this.printText(text, format);                        // print the request with the two parameters
    }
    
    public printReceipt(amount : number, sold : number) : boolean { // printing a receipt after a withdraw
        const text = this.getText(sold, amount);                    // getting the text for the request
        const format = this.getFormat(amount);                      // getting the format for the request

        return this.printText(text, format);                        // print the request with the two parameters
    }

    protected getText(sold : number, amount? : number) : string {   // getting the text for the request
        if(amount)                                                  // if there is an amount parameter it means a withdraw text is needed
            return (`Withdraw: ` + amount + ` RON\n Remaining sold: ` + sold + ` RON`);
        else                                                        // otherwise an account sold text is needed
            return (`Remaining sold is ` + sold + ` RON`);
    }

    protected abstract getFormat(amount? : number) : FormatObj;

    protected abstract printText(text : string, format? : FormatObj) : boolean;
}