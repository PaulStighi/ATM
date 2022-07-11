Feature: Dealer : Handle Sum
    Receives an amount of money to 
    hande with the available bills
    inside the bill boxes

        Scenario Outline: Dealer : Handle Sum (possible / impossible)
            Given Dealer : The amount to handle is <amount>
            When Dealer : The Dealer tries to handle it
            Then Dealer : The answer should be "<answer>"

        Examples:
        | amount | answer           |
        | 120    | can be handled   |
        | 3650   | can't be handled |
        | 123    | can't be handled |
        | 3000   | can be handled   |
        | 120    | can be handled   |