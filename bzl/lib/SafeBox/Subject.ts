import { Observer } from "../BillBox/Observer";

export interface Subject {
    attachObserver(observer : Observer) : void;
    notify() : void;
}