import { IteratorInterface } from "./Iterator";

export class ArrayIterator <T> implements IteratorInterface<T> {
    public array : T[];
    public index : number = 0;

    constructor(array : T[]) {
        this.array = array;
    }

    public rewind() : void{             // gets the index of the iterator back to the start (index 0)
        this.index = 0;
    }
    
    public next() : T {                 // returns the object from the current index, and moves the index further
        return this.array[this.index++];
    }
    
    public valid() : boolean {          // checks if the current index is a valid possition in the array
        return (this.index < this.array.length);
    }

    public getIndex() : number {        // returns the current index
        return this.index;
    }

    public item(index : number) : T {   // returns the item from the array at the specified index
        return this.array[index];
    }
}