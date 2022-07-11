import { Errors } from "../../../config/errors";
import { Subject } from "./Subject";
import { Observer } from "../BillBox/Observer";

export class SafeBox implements Subject{
    private locked : boolean = true;
    private money_in_safe_box : number = 0;
    private observers : Array<Observer> = [];
    private static instance : SafeBox =  null;              // the same instance is returned every time

    private constructor(){}

    public getMoneyInSafeBox() : number {
        return this.money_in_safe_box;
    }

    public static getInstance() : SafeBox {                 // the instance is created when the safebox is firstly requested
        if(!this.instance)
            this.instance = new SafeBox();                  // if it is the first request of instance, a new instance is created
        return SafeBox.instance;
    }
    
    public addMoneyInSafeBox(amount : number) : boolean {   // receiving a sum of money from a billbox and add it to the money in safebox
        if(this.locked){                                    // only if the safebox is locked
            this.money_in_safe_box += amount;
            return true;
        }
        else
            throw new Error(Errors.errorStuckSafeBox);      // otherwise an error is thrown
    }

    public unlockSafeBox() : boolean {                      // unlocking the safebox for ejecting the money
        if(this.locked){                                    // only if the safebox is locked
            this.locked = false;                            // change the state of locking
            console.log(this.money_in_safe_box + " : ejected amount\n");
            this.money_in_safe_box = 0;                     // the money are taken from the safebox
            this.notify();                                  // the observers are notified that the unlock event took place
            return true;                                    // the unlock operation was successful
        }
        else
            return false;                                   // otherwise the unlock fails
            
    }
    
    public lockSafeBox() : boolean {                        // locking the safebox back after the money were taken
        if(!this.locked){                                   // only if the safebox is unlocked
            this.locked = true;                             // change the state of locking
            return true;                                    // the lock operation was successful
        }
        else
            return false;                                   // otherwise the lock fails
    }

    public attachObserver(observer : Observer) : void {     // an observer is attached to the safebox
        this.observers.push(observer);
    }

    public notify() : void {                                // the list of observers is notified because of the triggering event
        for(let ob of this.observers) 
            ob.update();
    }
}