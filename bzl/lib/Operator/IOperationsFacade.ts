import { ReturnObj } from "./ReturnObj";

export interface IOperationsFacade {
    printAccSold(sold : number) : ReturnObj;
    withdraw(amount : number, need_receipt : boolean, sold : number) : ReturnObj;
}