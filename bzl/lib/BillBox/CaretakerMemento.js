/* import { BillBoxMemento } from "./BillBoxMemento";
import { BillBox } from "./BillBox";

export class CaretakerMemento {
    private bill_box : BillBoxMemento;
    private originiator : BillBox;

    // links the caretaker with the billbox to be responsable of
    constructor(originator : BillBox) {
        this.originiator = originator;
    }

    // asks the billbox to create a memento with it's current state and stores it
    public backup() {
        this.bill_box = this.originiator.save();
    }

    // restore the billbox previous state using the memento
    public undo()  {
        this.originiator.restore(this.bill_box);
    }
} */ 
