import { Operator } from "../Operator";
import { IOperationsFacade } from "../IOperationsFacade";
import { IOperatorBuilder } from "./IOperatorBuilder";
import { AccAuthSyst } from "../../Authenticator/AccAuthSyst";

export class OperatorBuilder implements IOperatorBuilder {
    readonly operator : Operator;
    
    constructor() {
        this.operator = new Operator();
    }

    public withAuthenticator(authenticator : AccAuthSyst) : void {
        this.operator.setAuthenticator(authenticator);
    }

    public withOpFacade(op_facade : IOperationsFacade) : void {
        this.operator.setOpFacade(op_facade);
    }

    public build() : Operator {
        return this.operator;
    }
}