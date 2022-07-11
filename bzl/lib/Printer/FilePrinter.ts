import { FancyPrinter } from "./FancyPrinter";

export class FilePrinter extends FancyPrinter {
    private paper_amount : number;
    private max_amount : number;
    private path : string;

    constructor(path : string, paper_amount : number) {
        super();
        this.path = path;
        this.paper_amount = paper_amount;
        this.max_amount = paper_amount;
    }

    protected printText(text : string) : boolean {              // print the request with the text parameter in the output file
            try {
                let fs = require('fs');
                fs.appendFile(this.path, text + "\n", (err) => {    // the new text is appended to the output file
                    if (err) throw err;
                });
                return true;
            } catch (error) {
                throw error;
            }
    }

    public getPaperAmount() : number {
            return this.paper_amount;
    }
    
    public refillPaper() : void {                               // refilling the paper suply if it goes out
        try {
            this.paper_amount = this.max_amount;
        } catch (error) {
            throw error;
        }
    }
}