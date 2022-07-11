export class FormatObj {
    public fg : string;
    public bg : string;
    public reset : string;
    
    constructor(fg : string, bg : string, reset : string) {
        this.fg = fg;
        this.bg = bg;
        this.reset = reset;
    }
}