Feature: ArrayIterator : using the iterator
    Using the ArrayIterator of type T

    Scenario Outline: ArrayIterator : Using different types of iterator
        Given ArrayIterator : The array inside is "<config>"
        Given ArrayIterator : The iterator type is "<T>"
        When ArrayIterator : The next function is called
        Then ArrayIterator : The return of next should be "<next>"
        When ArrayIterator : The valid function is called
        Then ArrayIterator : The return of valid should be "<valid>"
        When ArrayIterator : The getIndex function is called
        Then ArrayIterator : The return of getIndex should be <index_get>
        When ArrayIterator : The rewind function is called
        Then ArrayIterator : The return of getIndex after rewind should be <index_rewind>
        
    Examples:
    | T      | config          | next | valid | index_get | index_rewind | 
    | number | 1,2,3           | 1    | true  | 1         | 0            |
    | string | a,b,c           | a    | true  | 1         | 0            |
    | bool   | true,false,true | true | true  | 1         | 0            |