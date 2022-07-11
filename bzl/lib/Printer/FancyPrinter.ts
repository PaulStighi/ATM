import { Printer } from "./Printer";
import { FormatObj } from "./FormatObj";
const colors = require("../../../config/Printer/colors").colors;

export abstract class FancyPrinter extends Printer {
    constructor() {
        super();  
    }

    protected getFormat(amount? : number) : FormatObj {                             // getting the format for the request
        if(amount)                                                                  // if there is an amount parameter it means a withdraw format is needed
            return new FormatObj(colors.fg.Green, colors.bg.Black, colors.Reset);
        else                                                                        // otherwise an account sold format is needed
            return new FormatObj(colors.fg.Blue, colors.bg.Black, colors.Reset);
    }
}