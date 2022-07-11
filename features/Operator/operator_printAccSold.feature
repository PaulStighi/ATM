Feature: Operator : Print Account Sold
   The operator tries to print the account sold.

    Scenario Outline: Operator : Print Account Sold with an active session
        Given Operator : Card Number is <card_number>
        And Operator : Pin Code is <card_pin>
        And Operator : Is logged in
        When Operator : The operator tries to printAccSold
        Then Operator : The answer of printAccSold should be "<answer>"

     Examples:
    | card_number   | card_pin | answer     |
    | "2123 1212"   | 1234     | successful |
    | "3221 3173"   | 1234     | successful |
    | "4750 4891"   | 1234     | successful |
    | "7519 3147"   | 4317     | successful |
    | "6478 1247"   | 3412     | successful |

    Scenario: Operator : Print Account Sold without an active session
        Given Operator : There is no session account logged in
        When Operator : The operator tries to printAccSold
        Then Operator : The answer of printAccSold should be "Not logged in!"