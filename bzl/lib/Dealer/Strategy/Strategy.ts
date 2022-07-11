export interface Strategy {
    name : string;
    chooseDistribution(current_bills : Map<number,number>, amount : number) : Map<number,number>;
}