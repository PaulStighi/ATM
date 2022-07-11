Feature: Operator : Withdraw
   The operator tries to withdraw a given amount.

    Scenario Outline: Operator : Withdraw with an active session
        Given Operator : Card Number is <card_number>
        And Operator : Pin Code is <card_pin>
        And Operator : Is logged-in
        And Operator : The amount to withdraw is <amount>
        When Operator : The operator tries to withdraw the amount
        Then Operator : The answer of withdraw should be "<answer>"

    Examples:
    | card_number   | card_pin | amount | answer                    |
    | "2123 1212"   | 1234     | 20     | successful                |
    | "6478 1247"   | 3412     | 100    | successful                |
    | "2123 1212"   | 1234     | 200    | successful                |
    | "7519 3147"   | 4317     | 50     | successful                |
    | "6478 1247"   | 3412     | 300    | successful                |
    | "2123 1212"   | 1234     | 700    | successful                |
    | "7519 3147"   | 4317     | 150    | successful                |
    | "2123 1212"   | 1234     | 320    | successful                |
    | "4750 4891"   | 1234     | 321    | ATM needs service!        |
    | "3221 3173"   | 1234     | 400    | Not enough money in sold! |

    Scenario: Operator : Withdraw without an active session
        Given Operator : There is no session account logged in
        And Operator : The amount to withdraw is 100
        When Operator : The operator tries to withdraw the amount
        Then Operator : The answer of withdraw should be "Not logged in!"