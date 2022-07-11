Feature: OpFacade : CheckMoneyInSafeBox
   The operator facade checks if the money the dealer
   sent to the safebox actually arived inside it

    Scenario Outline: OpFacade : Check the arrival of the money inside the safebox
        Given OpFacade : The sold is <sold>
        And OpFacade : The Amount to withdraw is <amount>
        And OpFacade : The error amount left inside the safebox is <error_money>
        When OpFacade : The operator Facade tries to withdraw the amount
        Then OpFacade : The answer of Withdraw should be "<answer>"

    Examples:
    | sold | amount   | error_money | answer                     |
    | 1000 | 200      | 30          | Internal error, try again! |
    | 1000 | 400      | 20          | Internal error, try again! |
    | 1000 | 320      | 0           | successful                 |
    | 1000 | 150      | 0           | successful                 |