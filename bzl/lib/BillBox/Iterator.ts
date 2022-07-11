export interface IteratorInterface<T> {
    next() : T;
    valid() : boolean;
    rewind() : void;
}