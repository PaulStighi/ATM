Feature: BillBox : Update Number Of Bills
    Add a given number of bills to a specific
    billbox. The number of bills can be negative,
    meaning that the call of the function is made
    for a extraction of bills.

    Scenario Outline: BillBox : Update the number of Bills
        Given BillBox : The billbox have been created and has <init_num> 
        And BillBox : Bills of value <bill_value>
        When BillBox : The billbox is updated with <number_to_add> bills
        Then BillBox : The updated number of bills is <final_num> bills

    Examples:
    | init_num | bill_value | number_to_add | final_num |
    | 10       | 100        | 12            | 22        |
    | 6        | 100        | -5            | 1         |
    | 4        | 100        | 16            | 20        |
    | 18       | 100        | -8            | 10        |
    | 10       | 100        | -20           | 10        |

    Scenario: BillBox : Trying to extract more than possible
        Given BillBox : The billbox have been created and has 10 
        And BillBox : Bills of value 100
        When BillBox : The billbox is updated with -20 bills
        Then BillBox : The answer of the update should be "Impossible to update"