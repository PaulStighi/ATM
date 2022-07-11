export class BillBoxMemento {
    private num_of_bills : number;

    constructor(num_of_bills : number) {
        this.num_of_bills = num_of_bills;
    }

    public getNumOfBills() : number {
        return this.num_of_bills;
    }
}