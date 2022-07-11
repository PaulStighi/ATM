Feature: BillBox : Send Bills
    Send a specific number of bills 
    to the safebox that is linked with
    the billbox operating with

    Scenario Outline: BillBox : Send a possible number of bills 
        Given BillBox : The Billbox have been created and has <init_num> bills
        And BillBox : Bills of Value <bill_value>
        When BillBox : <number_to_send> bills are sent to the safebox
        Then BillBox : The number of bills sent is <bills_in_sb> bills

    Examples:
    | init_num | bill_value | number_to_send | bills_in_sb |
    | 10       | 100        | 8              | 8           |
    | 6        | 100        | -5             | 0           |
    | 4        | 100        | 16             | 0           |
    | 18       | 100        | 8              | 8           |
    | 10       | 100        | 10             | 10          |

    Scenario: Trying to extract more than possible
        Given BillBox : The Billbox have been created and has 10 bills
        And BillBox : Bills of Value 100
        When BillBox : -20 bills are sent to the safebox
        Then BillBox : The answer of the send should be "Impossible to send"