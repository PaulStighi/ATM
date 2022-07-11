import { FancyPrinter } from "./FancyPrinter";
import { FormatObj } from "./FormatObj";

export class ConsolePrinter extends FancyPrinter {
    constructor() {
        super();
    }

    protected printText(text : string, format : FormatObj) : boolean { // print the request with the two parameters in the console
        try {
            console.log(format.fg, text, format.reset);
            return true;    
        } catch (error) {
            throw error;
        }
    }
}