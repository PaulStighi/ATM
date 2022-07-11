Feature: OpFacade : Withdraw
   The operator facade tries to withdraw a given amount.

    Scenario Outline: OpFacade : Withdraw with an active session
        Given OpFacade : Card Number is <card_number>
        And OpFacade : Pin Code is <card_pin>
        And OpFacade : Is logged-in
        And OpFacade : The amount to withdraw is <amount>
        When OpFacade : The operator facade tries to withdraw the amount
        Then OpFacade : The answer of withdraw should be "<answer>"

    Examples:
    | card_number   | card_pin | amount | answer                    |
    | "2123 1212"   | 1234     | 200    | successful                |
    | "3221 3173"   | 1234     | 400    | Not enough money in sold! |
    | "4750 4891"   | 1234     | 321    | ATM needs service!        |
    | "7519 3147"   | 4317     | 150    | successful                |