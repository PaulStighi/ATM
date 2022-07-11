import { Account } from "./Account"

export interface AccDB{
    extractAcc(card_number : string) : Account;
    updateAccSold(card_number : string, new_sold : number) : boolean;
}