import { Operator } from "../Operator";
import { IOperationsFacade } from "../IOperationsFacade";
import { AccAuthSyst } from "../../Authenticator/AccAuthSyst";

export interface IOperatorBuilder {
    withAuthenticator(authenticator : AccAuthSyst) : void;
    withOpFacade(op_facade : IOperationsFacade) : void;
    build() : Operator;
}