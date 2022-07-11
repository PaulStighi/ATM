Feature: OpFacade : Print Account Sold
   The operator facade tries to print the account sold.

    Scenario Outline: OpFacade : Print Account Sold with an active session
        Given OpFacade : Card Number is <card_number>
        And OpFacade : Pin Code is <card_pin>
        And OpFacade : Is logged in
        When OpFacade : The operator facade tries to printAccSold
        Then OpFacade : The answer of printAccSold should be "<answer>"

     Examples:
    | card_number   | card_pin | answer     |
    | "2123 1212"   | 1234     | successful |
    | "3221 3173"   | 1234     | successful |
    | "4750 4891"   | 1234     | successful |
    | "7519 3147"   | 4317     | successful |
    | "6478 1247"   | 3412     | successful |